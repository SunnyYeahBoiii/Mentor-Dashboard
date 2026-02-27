import { Controller, Post, Req } from "@nestjs/common";
import { MeetService } from "./google-meet.service";



@Controller('meet')
export class MeetController {
    constructor(private readonly meetService: MeetService) { }

    @Post()
    async createMeet(@Req() req: any) {
        return this.meetService.createMeetLink(
            req.cookies.access_token,
            req.cookies.refresh_token,
        );
    }
}