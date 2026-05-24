import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
} from '@nestjs/common';
import { google } from 'googleapis';
import { decryptGoogleToken } from 'src/auth/session';

@Injectable()
export class MeetService {
    private createOAuthClient() {
        return new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_CALLBACK_URL,
        );
    }

    private createAuthorizedClient(encryptedRefreshToken: string) {
        const auth = this.createOAuthClient();
        auth.setCredentials({
            refresh_token: decryptGoogleToken(encryptedRefreshToken),
        });
        return auth;
    }

    async createMeetLink(
        encryptedRefreshToken: string,
    ): Promise<{ meetingUri: string; eventId: string }> {
        const auth = this.createAuthorizedClient(encryptedRefreshToken);

        try {
            const calendar = google.calendar({
                version: 'v3',
                auth,
            });

            const event = {
                summary: 'Meet Link Generation',
                description: 'Automated Meeting Space',
                start: { dateTime: new Date().toISOString() },
                end: {
                    dateTime: new Date(Date.now() + 30 * 60000).toISOString(),
                },
                conferenceData: {
                    createRequest: {
                        requestId: `meet-${Date.now()}`,
                        conferenceSolutionKey: { type: 'hangoutsMeet' },
                    },
                },
            };

            const res = await calendar.events.insert({
                calendarId: 'primary',
                conferenceDataVersion: 1,
                requestBody: event,
            });

            const meetingUri = res.data.conferenceData?.entryPoints?.[0]?.uri;
            const eventId = res.data.id;

            if (!eventId || !meetingUri) {
                throw new InternalServerErrorException(
                    'Failed to generate Meet link',
                );
            }

            await calendar.events.delete({
                calendarId: 'primary',
                eventId,
            });

            return { meetingUri, eventId };
        } catch (error: unknown) {
            this.throwGoogleError(error);
        }
    }

    async refreshUserTokens(
        encryptedRefreshToken: string,
    ): Promise<{ refreshed: true; expiresAt: number | null }> {
        const auth = this.createAuthorizedClient(encryptedRefreshToken);
        try {
            const { credentials } = await auth.refreshAccessToken();

            if (!credentials.access_token) {
                throw new UnauthorizedException({
                    code: 'TOKEN_REFRESH_FAILED',
                    message: 'Google did not return an access token',
                });
            }

            return {
                refreshed: true,
                expiresAt: credentials.expiry_date ?? null,
            };
        } catch (error: unknown) {
            this.throwGoogleError(error);
        }
    }

    private throwGoogleError(error: unknown): never {
        if (error instanceof HttpException) {
            throw error;
        }

        const status = Number(this.getGoogleErrorStatus(error));

        if (status === 401) {
            throw new UnauthorizedException({
                code: 'TOKEN_EXPIRED',
                message: 'Google token is invalid or expired',
            });
        }

        if (status === 403) {
            throw new ForbiddenException({
                code: 'GOOGLE_SCOPE_DENIED',
                message: 'Google account has insufficient Calendar permission',
            });
        }

        if (status === 429) {
            throw new HttpException(
                {
                    code: 'GOOGLE_RATE_LIMITED',
                    message: 'Google Calendar rate limit exceeded',
                },
                HttpStatus.TOO_MANY_REQUESTS,
            );
        }

        if (status >= 500) {
            throw new ServiceUnavailableException({
                code: 'GOOGLE_UNAVAILABLE',
                message: 'Google Calendar is unavailable',
            });
        }

        throw new InternalServerErrorException({
            code: 'MEET_LINK_FAILED',
            message: 'Failed to generate Meet link',
        });
    }

    private getGoogleErrorStatus(error: unknown): unknown {
        if (typeof error !== 'object' || error === null) {
            return undefined;
        }

        const maybeGoogleError = error as {
            response?: { status?: unknown };
            code?: unknown;
        };
        return maybeGoogleError.response?.status ?? maybeGoogleError.code;
    }
}
