import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

// Patch BigInt serialization for JSON.stringify
Object.defineProperty(BigInt.prototype, 'toJSON', {
    value(this: bigint) {
        return this.toString();
    },
});

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    const config = new DocumentBuilder()
        .setTitle('Mentor Dashboard API')
        .setDescription('The Mentor Dashboard API description')
        .setVersion('1.0')
        .addTag('students')
        .addTag('classes')
        .addTag('student-class')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const allowedOrigins = (
        process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000'
    )
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);

    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    });

    app.use((req: Request, res: Response, next: NextFunction) => {
        const unsafeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
        const origin = req.headers.origin;

        if (
            unsafeMethods.has(req.method) &&
            typeof origin === 'string' &&
            !allowedOrigins.includes(origin)
        ) {
            res.status(403).json({ message: 'Forbidden origin' });
            return;
        }

        next();
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    await app.listen(process.env.PORT ?? 21389);
}
void bootstrap();
