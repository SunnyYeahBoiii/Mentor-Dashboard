import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class MeetService {
    private createOAuthClient() {
        return new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_CALLBACK_URL,
        );
    }

    async createMeetLink(userAccessToken: string, userRefreshToken: string) {
        const auth = this.createOAuthClient();

        auth.setCredentials({
            access_token: userAccessToken,
            refresh_token: userRefreshToken,
        });

        const calendar = google.calendar({
            version: 'v3', auth
        });

        const event = {
            summary: 'Meet Link Generation',
            description: 'Automated Meeting Space',
            start: { dateTime: new Date().toISOString() },
            end: { dateTime: new Date(Date.now() + 30 * 60000).toISOString() }, // 30 mins later
            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`, // Must be unique
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
        };

        try {
            // 1. Insert the event with conferenceDataVersion: 1 to trigger Meet creation
            const res = await calendar.events.insert({
                calendarId: 'primary',
                conferenceDataVersion: 1,
                requestBody: event,
            });

            const meetingUri = res.data.conferenceData?.entryPoints?.[0]?.uri;
            const eventId = res.data.id;

            if (!eventId) {
                throw new InternalServerErrorException('Failed to generate Meet link');
            }

            await calendar.events.delete({
                calendarId: 'primary',
                eventId,
            });

            return { meetingUri, eventId };
        } catch (error) {
            console.error('Google Calendar Error:', error.response?.data || error.message);
            throw new InternalServerErrorException('Failed to generate Meet link');
        }
    }

    async refreshUserTokens(refreshToken: string): Promise<any> {
        const auth = this.createOAuthClient();
        auth.setCredentials({
            refresh_token: refreshToken,
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/calendar'
        });
        try {
            const { credentials } = await auth.refreshAccessToken();
            // credentials contains:
            // { access_token, refresh_token, expiry_date, token_type, id_token, scope }

            return credentials;
        } catch (error) {
            throw new InternalServerErrorException('Failed to refresh Google token');
        }
    }
}