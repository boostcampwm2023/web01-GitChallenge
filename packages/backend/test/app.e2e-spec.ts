import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('QuizWizardController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should solve quiz for git init command', async () => {
    // 명령 실행
    await request(app.getHttpServer())
      .post('/api/v1/quizzes/1/command')
      .send({
        mode: 'command',
        message: 'git init',
      })
      .expect(200);

    // 퀴즈 제출 및 검증
    const response = await request(app.getHttpServer())
      .post('/api/v1/quizzes/1/submit')
      .expect(200);

    expect(response.body).toHaveProperty('solved', true);
  });

  afterEach(async () => {
    await app.close();
  });
});
