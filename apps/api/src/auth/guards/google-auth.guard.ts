import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type Response } from 'express';
import {
    createOpaqueToken,
    getClearCookieOptions,
    getCookieOptions,
    OAUTH_STATE_COOKIE,
    OAUTH_STATE_TTL_MS,
    safeEqual,
} from '../session';
import type { CookieRequest } from '../auth-request';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<CookieRequest>();
        const response = context.switchToHttp().getResponse<Response>();

        if (this.isCallback(request)) {
            const queryState = request.query?.state;
            const cookieState = request.cookies?.[OAUTH_STATE_COOKIE];
            if (
                typeof queryState !== 'string' ||
                !safeEqual(queryState, cookieState)
            ) {
                response.cookie(
                    OAUTH_STATE_COOKIE,
                    '',
                    getClearCookieOptions(),
                );
                throw new UnauthorizedException('Invalid OAuth state');
            }
        }

        const result = await super.canActivate(context);
        return result as boolean;
    }

    getAuthenticateOptions(
        context: ExecutionContext,
    ): { state: string } | undefined {
        const request = context.switchToHttp().getRequest<CookieRequest>();
        const response = context.switchToHttp().getResponse<Response>();

        if (this.isCallback(request)) {
            return undefined;
        }

        const state = createOpaqueToken();
        response.cookie(
            OAUTH_STATE_COOKIE,
            state,
            getCookieOptions(OAUTH_STATE_TTL_MS),
        );
        return { state };
    }

    private isCallback(request: { path?: string; originalUrl?: string }) {
        return Boolean(
            request.path?.includes('/callback') ||
            request.originalUrl?.includes('/callback'),
        );
    }
}
