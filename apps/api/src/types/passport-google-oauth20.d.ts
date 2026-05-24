declare module 'passport-google-oauth20' {
    import type { Strategy as PassportStrategy } from 'passport-strategy';

    export type VerifyCallback = (
        error: Error | null,
        user?: unknown,
        info?: unknown,
    ) => void;

    export type Profile = {
        id?: string;
        displayName?: string;
        emails?: Array<{ value: string }>;
        name?: {
            givenName?: string;
            middleName?: string;
            familyName?: string;
        };
        photos?: Array<{ value: string }>;
    };

    export type StrategyOptions = {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        scope?: string[];
    };

    export class Strategy extends PassportStrategy {
        constructor(options: StrategyOptions);
    }
}
