import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';

describe('QuizWizardController (e2e)', () => {
  let app: INestApplication;
  let response;
  let cookie;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());

    await app.init();
  });

  describe('1번 문제 채점 테스트', () => {
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete('/api/v1/quizzes/1/command')
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/1/command')
        .send({
          mode: 'command',
          message: 'git init',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/1/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('아무 것도 하지 않았다면', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/1/submit')
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('2번 문제 채점 테스트', () => {
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete('/api/v1/quizzes/2/command')
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/2/command')
        .send({
          mode: 'command',
          message: 'git config user.name GitChallenge',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/2/command')
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git config user.email gitchallenge@mergemaster.com',
        });

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/2/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('이름만 바꾼 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/2/command')
        .send({
          mode: 'command',
          message: 'git config user.name GitChallenge',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/2/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('3번 문제 채점 테스트', () => {
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete('/api/v1/quizzes/3/command')
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/3/command')
        .send({
          mode: 'command',
          message: 'git add README.md docs/plan.md',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/3/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('전부 add한 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/3/command')
        .send({
          mode: 'command',
          message: 'git add .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/3/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('4번 문제 채점 테스트', () => {
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete('/api/v1/quizzes/4/command')
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/4/command')
        .send({
          mode: 'command',
          message: 'git commit -m "test commit"',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/4/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('에디터 이용 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/4/command')
        .send({
          mode: 'command',
          message: 'git commit',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/4/command')
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: 'test commit',
        });

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/4/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('커밋하지 않은 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/4/command')
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/4/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('5번 문제 채점 테스트', () => {
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete('/api/v1/quizzes/5/command')
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/5/command')
        .send({
          mode: 'command',
          message: 'git switch -c dev',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/5/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('브랜치명 오타 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/5/command')
        .send({
          mode: 'command',
          message: 'git branch devv',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/5/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('6번 문제 채점 테스트', () => {
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete('/api/v1/quizzes/6/command')
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/6/command')
        .send({
          mode: 'command',
          message: 'git add .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/6/command')
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit -m "test commit"',
        });

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/6/command')
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch main',
        });

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/6/submit')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('stash하고 메인 이동', async () => {
      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/6/command')
        .send({
          mode: 'command',
          message: 'git stash',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/6/command')
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch main',
        });

      response = await request(app.getHttpServer())
        .post('/api/v1/quizzes/6/submit')
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
