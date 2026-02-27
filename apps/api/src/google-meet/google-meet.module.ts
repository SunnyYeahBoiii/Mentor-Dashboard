import { Module } from "@nestjs/common";
import { MeetService } from "./google-meet.service";
import { MeetController } from "./google-meet.controller";
import { ConfigModule } from "@nestjs/config";


@Module({
    providers: [MeetService],
    controllers: [MeetController],
    exports: [MeetService],
    imports: [ConfigModule]
})
export class MeetModule { };