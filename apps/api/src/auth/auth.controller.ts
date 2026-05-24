import {
    Controller,
    Get,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Response } from 'express';
import type { GoogleOAuthRequest } from './auth-request';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import {
    APP_SESSION_COOKIE,
    createOpaqueToken,
    encryptGoogleToken,
    getClearCookieOptions,
    getCookieOptions,
    hashToken,
    isGoogleEmailAllowed,
    OAUTH_STATE_COOKIE,
    SESSION_TTL_MS,
} from './session';

@Controller('auth')
export class AuthController {
    constructor(
        readonly prisma: PrismaService,
        readonly config: ConfigService,
    ) {}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {}

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(
        @Req() req: GoogleOAuthRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        const googleUser = req.user;
        const email = googleUser.email.toLowerCase();
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser && !isGoogleEmailAllowed(email)) {
            res.cookie(OAUTH_STATE_COOKIE, '', getClearCookieOptions());
            throw new UnauthorizedException('Google email is not allowed');
        }

        const encryptedRefreshToken = googleUser.refreshToken
            ? encryptGoogleToken(googleUser.refreshToken)
            : existingUser?.googleRefreshToken;

        if (!encryptedRefreshToken) {
            throw new UnauthorizedException('Google refresh token missing');
        }

        const sessionToken = createOpaqueToken();
        const sessionExpiresAt = new Date(Date.now() + SESSION_TTL_MS);

        if (existingUser) {
            await this.prisma.user.update({
                where: { id: existingUser.id },
                data: {
                    fullName: googleUser.fullName ?? existingUser.fullName,
                    avatar: googleUser.avatar ?? existingUser.avatar,
                    googleRefreshToken: encryptedRefreshToken,
                    sessionTokenHash: hashToken(sessionToken),
                    sessionExpiresAt,
                },
            });
        } else {
            await this.prisma.user.create({
                data: {
                    email,
                    fullName: googleUser.fullName ?? '',
                    avatar: googleUser.avatar,
                    googleRefreshToken: encryptedRefreshToken,
                    sessionTokenHash: hashToken(sessionToken),
                    sessionExpiresAt,
                },
            });
        }

        res.cookie(
            APP_SESSION_COOKIE,
            sessionToken,
            getCookieOptions(SESSION_TTL_MS),
        );
        res.cookie(OAUTH_STATE_COOKIE, '', getClearCookieOptions());
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        return res.redirect(this.config.getOrThrow<string>('FRONTEND_URL'));
    }

    @Get('logout')
    async logout(
        @Req() req: { cookies?: Record<string, string> },
        @Res({ passthrough: true }) res: Response,
    ) {
        const sessionToken = req.cookies?.[APP_SESSION_COOKIE];
        if (sessionToken) {
            await this.prisma.user.updateMany({
                where: { sessionTokenHash: hashToken(sessionToken) },
                data: {
                    sessionTokenHash: null,
                    sessionExpiresAt: null,
                },
            });
        }

        res.cookie(APP_SESSION_COOKIE, '', getClearCookieOptions());
        res.cookie(OAUTH_STATE_COOKIE, '', getClearCookieOptions());
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.redirect(this.config.getOrThrow<string>('FRONTEND_URL'));
    }
}
