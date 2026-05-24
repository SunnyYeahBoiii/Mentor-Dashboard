import type { Request } from 'express';
import type { UserModel } from '../../generated/models/User';

export type CookieRequest = Omit<Request, 'cookies'> & {
    cookies: Record<string, string | undefined>;
};

export type LocalAuthUser = {
    localAuth: true;
};

export type AuthenticatedRequest = CookieRequest & {
    user?: UserModel | LocalAuthUser;
};

export type GoogleOAuthProfile = {
    email: string;
    fullName?: string;
    avatar?: string;
    refreshToken?: string;
};

export type GoogleOAuthRequest = CookieRequest & {
    user: GoogleOAuthProfile;
};

export function hasGoogleRefreshToken(
    user: AuthenticatedRequest['user'],
): user is UserModel & { googleRefreshToken: string } {
    return (
        typeof user === 'object' &&
        user !== null &&
        'googleRefreshToken' in user &&
        typeof user.googleRefreshToken === 'string' &&
        user.googleRefreshToken.length > 0
    );
}
