import {
    Controller,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import {
    type AuthenticatedRequest,
    hasGoogleRefreshToken,
} from 'src/auth/auth-request';
import { MeetService } from './google-meet.service';
import { CookieAuthGuard } from 'src/auth/guards/cookie-auth.guard';

@UseGuards(CookieAuthGuard)
@Controller('meet')
export class MeetController {
    constructor(private readonly meetService: MeetService) {}

    @Post()
    async createMeet(@Req() req: AuthenticatedRequest) {
        if (!hasGoogleRefreshToken(req.user)) {
            throw new UnauthorizedException('Google account is not connected');
        }
        return this.meetService.createMeetLink(req.user.googleRefreshToken);
    }

    @Post('refresh')
    async refreshAccess(@Req() req: AuthenticatedRequest) {
        if (!hasGoogleRefreshToken(req.user)) {
            throw new UnauthorizedException('Google account is not connected');
        }
        return this.meetService.refreshUserTokens(req.user.googleRefreshToken);
    }
}
