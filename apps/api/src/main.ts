import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ?? 21389);
}
bootstrap();
