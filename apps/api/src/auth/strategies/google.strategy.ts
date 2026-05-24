import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(readonly config: ConfigService) {
        const options = {
            clientID: config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
            clientSecret: config.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: config.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
            scope: [
                'email',
                'profile',
                'https://www.googleapis.com/auth/calendar.events',
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
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: VerifyCallback,
    ) {
        const email = profile.emails?.[0]?.value;

        if (!email) {
            cb(new UnauthorizedException('Google profile has no email'), false);
            return;
        }

        cb(null, {
            email,
            fullName:
                `${profile.name?.givenName || ''} ${profile.name?.middleName || ''} ${profile.name?.familyName || ''}`.trim() ||
                undefined,
            avatar: profile.photos?.[0]?.value,
            accessToken,
            refreshToken,
        });
    }
}
