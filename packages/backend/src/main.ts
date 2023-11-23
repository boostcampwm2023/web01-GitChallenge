import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'https://web01-git-challenge-frontend.vercel.app/',
      'https://git-challenge.com',
      'http://localhost:3000',
    ],
    credentials: true,
    exposedHeaders: ['Cookie'],
  });

  const config = new DocumentBuilder()
    .setTitle("Merge Masters' Git Challenge API")
    .setDescription('Git Challenge의 API 설명서입니다! 파이팅!')
    .setVersion('1.0')
    .addTag('quizzes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
