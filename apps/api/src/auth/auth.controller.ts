import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { type Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

// auth/auth.controller.ts
@Controller('auth')
export class AuthController {
    constructor(readonly prisma: PrismaService , readonly config: ConfigService) {}
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(
        @Req() req: any,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: req.user.email as string,
            },
        });

        if (!user) {
            return res.redirect(this.config.getOrThrow<string>('FRONTEND_URL') + '/auth/google');
        }

        res.cookie('refresh_token', user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        return res.redirect(this.config.getOrThrow<string>('FRONTEND_URL'));
    }
}
