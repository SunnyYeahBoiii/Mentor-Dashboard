import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/student.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClassModule } from './classes/classes.module';
import { StudentClassModule } from './student-class/student-class.module';
import { MeetModule } from './google-meet/google-meet.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, MeetModule, PrismaModule, StudentModule, ClassModule, StudentClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
