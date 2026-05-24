import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Module({
    imports: [ConfigModule, PrismaModule],
    controllers: [AuthController],
    providers: [GoogleStrategy, GoogleAuthGuard],
})
export class AuthModule {}
