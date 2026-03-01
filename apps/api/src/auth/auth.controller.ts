import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

// auth/auth.controller.ts
@Controller('auth')
export class AuthController {
    constructor(readonly prisma: PrismaService) {}
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
            return res.redirect('http://localhost:3000/login');
        }

        res.cookie('refresh_token', user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        return res.redirect('http://localhost:3000');
    }
}
