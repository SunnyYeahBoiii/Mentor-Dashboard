import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        readonly config: ConfigService,
        readonly prisma: PrismaService,
    ) {
        const options = {
            clientID: config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
            clientSecret: config.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: config.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
            scope: [
                'email',
                'profile',
                'https://www.googleapis.com/auth/calendar', // Full access to calendar
                'https://www.googleapis.com/auth/calendar.events', // specifically for creating events
            ],
        };
        super(options);
    }

    authorizationParams(): { [key: string]: string } {
        return {
            access_type: 'offline',
            prompt: 'consent',
        };
    }

    validate(
        _access_token: string,
        _refresh_token: string,
        profile: Profile,
        cb: VerifyCallback,
    ) {
        const user = {
            email: profile.emails![0].value,
            fullName:
                `${profile.name?.givenName || ''} ${profile.name?.middleName || ''} ${profile.name?.familyName || ''}`.trim() ||
                undefined,
            avatar: profile.photos![0].value,
            // accessToken: _access_token,
            // refreshToken: _refresh_token,
        };

        this.prisma.user
            .upsert({
                create: {
                    email: user.email,
                    fullName: user.fullName ?? '',
                    avatar: user.avatar,
                    refreshToken: _refresh_token,
                },
                update: {
                    refreshToken: _refresh_token,
                },
                where: {
                    email: user.email,
                },
            })
            .then((user) => {
                return user;
            })
            .catch((error) => {
                console.error('Error upserting user:', error);
            });

        cb(null, user);
    }
}
