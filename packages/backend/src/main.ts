import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import fs from 'fs';

async function bootstrap() {
  const dbPath = 'db.sqlite';

  // DB 파일이 존재하면 삭제
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

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
