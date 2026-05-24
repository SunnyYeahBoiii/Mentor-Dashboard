import { Module } from '@nestjs/common';
import { MeetService } from './google-meet.service';
import { MeetController } from './google-meet.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [MeetService],
    controllers: [MeetController],
    exports: [MeetService],
    imports: [ConfigModule, PrismaModule],
})
export class MeetModule {}
