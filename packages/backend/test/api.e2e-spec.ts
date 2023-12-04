import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';

describe('QuizWizardController (e2e)', () => {
  let app: INestApplication;
  let response;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());

    await app.init();
  });

  describe('GET shared?answer=""', () => {
    it('200', async () => {
      response = await request(app.getHttpServer())
        .get(
          `/api/v1/quizzes/shared?answer=644c3dc58a933571fd27ef95579b713c:618074da8a6d55a6b2b29e955942c887988ea264ab23ce6e99ef9fb09dbfc11ae6ca2c1c3e77c73370f6cc83d47600aaf6d702db3ad208febe6d81be7e9e4d30`,
        )
        .expect(200);

      expect(response.body.answer).toEqual(['git add .', 'git commit']);
      expect(response.body.quiz.id).toEqual(4);
    });

    it('400 잘못된 문자열', async () => {
      response = await request(app.getHttpServer())
        .get(`/api/v1/quizzes/shared?answer=""`)
        .expect(400);
    });

    it('400 복호화 했는데 이상함', async () => {
      response = await request(app.getHttpServer())
        .get(`/api/v1/quizzes/shared?answer=""`)
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
