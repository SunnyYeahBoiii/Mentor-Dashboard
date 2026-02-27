import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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

  app.use(cors({
    // 1. Phải chỉ định rõ Origin của Frontend (Không được dùng '*')
    origin: 'http://localhost:3000',

    // 2. Cho phép gửi Cookie/Header Authorization
    credentials: true,

    // 3. Các method bạn sử dụng
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    // 4. Các header cho phép từ phía Client
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
  }));

  await app.listen(process.env.PORT ?? 21389);
}
bootstrap();
