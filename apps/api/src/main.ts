import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Patch BigInt serialization for JSON.stringify
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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

    const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000')
        .split(',')
        .map((o) => o.trim());

    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        }),
    );

    await app.listen(process.env.PORT ?? 21389);
}
bootstrap();
