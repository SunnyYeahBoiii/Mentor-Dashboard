import {
    Controller,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { MeetService } from './google-meet.service';
import { type Response } from 'express';
import { CookieAuthGuard } from 'src/auth/guards/cookie-auth.guard';

@UseGuards(CookieAuthGuard)
@Controller('meet')
export class MeetController {
    constructor(private readonly meetService: MeetService) {}

    @Post()
    async createMeet(@Req() req: any) {
        if (!req.cookies.access_token) {
            throw new UnauthorizedException('No access token');
        }
        return this.meetService.createMeetLink(
            req.cookies.access_token,
            req.cookies.refresh_token,
        );
    }

    @Post('refresh')
    async refreshAccess(
        @Req() req: any,
        @Res({ passthrough: true }) res: Response,
    ): Promise<any> {
        const newAccessToken = await this.meetService.refreshUserTokens(
            req.cookies.refresh_token,
        );

        res.cookie('access_token', (newAccessToken as any).access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 24 * 7,
        });

        return { access_token: (newAccessToken as any).access_token };
    }
}
