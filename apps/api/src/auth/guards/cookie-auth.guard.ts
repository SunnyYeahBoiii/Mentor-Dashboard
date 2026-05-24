import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CookieAuthGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies?.refresh_token;

        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }

        const user = await this.prisma.user.findFirst({
            where: { refreshToken },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }

        request.user = user;
        return true;
    }
}
