import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { type Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

// auth/auth.controller.ts
@Controller('auth')
export class AuthController {
    constructor(readonly prisma: PrismaService) { }
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() _) { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        // 1. Save req.user.refreshToken to your DB for this user
        // 2. Redirect to your frontend

        console.log(req.cookies);

        res.cookie('refresh_token', req.user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
        });

        res.cookie('access_token', req.user.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
        });

        this.prisma.user.upsert({
            create: {
                email: req.user.email,
                fullName: req.user.fullName,
                avatar: req.user.avatar,
                refreshToken: req.user.refreshToken,
            },
            update: {
                refreshToken: req.user.refreshToken,
            },
            where: {
                email: req.user.email,
            },
        }).then((user) => {

        }).catch((error) => {
            console.error('Error upserting user:', error);
        })

        return res.redirect('http://localhost:3000')
    }
}