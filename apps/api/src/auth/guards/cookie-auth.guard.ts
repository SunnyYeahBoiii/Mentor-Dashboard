import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    APP_SESSION_COOKIE,
    hashToken,
    LOCAL_AUTH_COOKIE,
    verifyLocalAuthToken,
} from '../session';
import type { AuthenticatedRequest } from '../auth-request';

@Injectable()
export class CookieAuthGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();
        const sessionToken = request.cookies?.[APP_SESSION_COOKIE];
        const localAuthToken = request.cookies?.[LOCAL_AUTH_COOKIE];

        if (verifyLocalAuthToken(localAuthToken)) {
            request.user = { localAuth: true };
            return true;
        }

        if (!sessionToken) {
            throw new UnauthorizedException('No app session');
        }

        const user = await this.prisma.user.findFirst({
            where: {
                sessionTokenHash: hashToken(sessionToken),
                sessionExpiresAt: { gt: new Date() },
            },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid session');
        }

        request.user = user;
        return true;
    }
}
