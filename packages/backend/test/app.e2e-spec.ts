import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';

describe('QuizWizardController (e2e)', () => {
  let app: INestApplication;
  let response;
  let cookie: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());

    await app.init();
  });

  describe('1번 문제 채점 테스트', () => {
    const id = 1;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git init',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('아무 것도 하지 않았다면', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('2번 문제 채점 테스트', () => {
    const id = 2;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git config user.name GitChallenge',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git config user.email gitchallenge@mergemaster.com',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('이름만 바꾼 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git config user.name GitChallenge',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('3번 문제 채점 테스트', () => {
    const id = 3;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git add README.md docs/plan.md',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('전부 add한 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git add .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('4번 문제 채점 테스트', () => {
    const id = 4;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git add .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit -m "test commit"',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('에디터 이용 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git add .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: 'test commit',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('커밋하지 않은 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('add하지 않은 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git commit -m "test commit"',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('5번 문제 채점 테스트', () => {
    const id = 5;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git switch -c dev',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('브랜치명 오타 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git branch devv',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('6번 문제 채점 테스트', () => {
    const id = 6;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git add .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit -m "test commit"',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch main',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('stash하고 메인 이동', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git stash',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch main',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });
  describe('7번 문제 채점 테스트', () => {
    const id = 7;
    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git add signup.test.js',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit --amend',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: '회원가입 기능 구현',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('마지막에 브랜치만 switch', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git add signup.test.js',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit --amend',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: '회원가입 기능 구현',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch feat/somethingA',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('amend하는 커밋 메시지 오타', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git add signup.test.js',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit --amend',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: '회원가입 기능 구현ㄴ',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('아무 것도 안 하고 채점', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('8번 문제 채점 테스트', () => {
    const id = 8;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git reset HEAD~1',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git add signup.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit -m "회원가입 기능 구현"',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git add signup.test.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit -m "회원가입 테스트 코드 작성"',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('에디터 적극 사용 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git reset HEAD~1',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git add signup.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: '회원가입 기능 구현',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git add signup.test.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: '회원가입 테스트 코드 작성',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('add, commit 순서 반대로', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git reset HEAD~1',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git add signup.test.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit -m "회원가입 테스트 코드 작성"',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git add signup.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit -m "회원가입 기능 구현"',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('아무 것도 안 하고 채점', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('9번 문제 채점 테스트', () => {
    const id = 9;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git restore important.js',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('아무 것도 안 하고 채점', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('10번 문제 채점 테스트', () => {
    const id = 10;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git clean -f tmp.js',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git clean -f tmptmp.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git clean -f tmptmptmp.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('tmptmptmp.js는 안 지움', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git clean -f tmp.js',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git clean -f tmptmp.js',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('11번 문제 채점 테스트', () => {
    const id = 11;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git stash',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git checkout 55f7aab2f31287f6bb159731e5824566c02b582b',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch -c hotfix/fixA',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('체크아웃 한 다음에 stash', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git checkout 55f7aab2f31287f6bb159731e5824566c02b582b',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git stash',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch -c hotfix/fixA',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('브랜치 만들 때 실수하는 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git stash',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git checkout 55f7aab2f31287f6bb159731e5824566c02b582b',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch hotfix/fixA',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('아무것도 안 하고 채점', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('12번 문제 채점 테스트', () => {
    const id = 12;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git switch hotfix/fixA',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git cherry-pick 38bafc899bb9257644ac616ac0075431d8481e83',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch main',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git merge hotfix/fixA',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch feat/somethingB',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git reset --hard HEAD^',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('somethingB reset 안 함', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git switch hotfix/fixA',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git cherry-pick 38bafc899bb9257644ac616ac0075431d8481e83',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch main',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git merge hotfix/fixA',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('main merge 안 함', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git switch hotfix/fixA',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git cherry-pick 38bafc899bb9257644ac616ac0075431d8481e83',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch feat/somethingB',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git reset --hard HEAD^',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('cherry-pick 실수 (다른 커밋에다 함)', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git switch hotfix/fixA',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git cherry-pick ee0765a0f4bd5df20a595100b62c041100d64096',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git merge hotfix/fixA',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git switch feat/somethingB',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git reset --hard HEAD^',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('13번 문제 채점 테스트', () => {
    const id = 13;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git rebase -i c01511a8d88b4355d754406ef6ec20aa49d69c5b',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: `reword 6a83279 로그인 기느 ㄱ후ㅕㄴ\npick 09dca00 로그인 테스트 코드 작성\npick d109f51 회원탈퇴 기능 구현\n\n# Rebase c01511a..d109f51 onto c01511a (3 commands)\n#\n# Commands:\n# p, pick <commit> = use commit\n# r, reword <commit> = use commit, but edit the commit message\n# e, edit <commit> = use commit, but stop for amending\n# s, squash <commit> = use commit, but meld into previous commit\n# f, fixup [-C | -c] <commit> = like \"squash\" but keep only the previous\n#                    commit's log message, unless -C is used, in which case\n#                    keep only this commit's message; -c is same as -C but\n#                    opens the editor\n# x, exec <command> = run command (the rest of the line) using shell\n# b, break = stop here (continue rebase later with 'git rebase --continue')\n# d, drop <commit> = remove commit\n# l, label <label> = label current HEAD with a name\n# t, reset <label> = reset HEAD to a label\n# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]\n#         create a merge commit using the original merge commit's\n#         message (or the oneline, if no original merge commit was\n#         specified); use -c <commit> to reword the commit message\n# u, update-ref <ref> = track a placeholder for the <ref> to be updated\n#                       to this position in the new commits. The <ref> is\n#                       updated at the end of the rebase\n#\n# These lines can be re-ordered; they are executed from top to bottom.\n#\n# If you remove a line here THAT COMMIT WILL BE LOST.\n#\n# However, if you remove everything, the rebase will be aborted.\n#\n`,
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git commit --amend',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'editor',
          message: '로그인 기능 구현',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git rebase --continue',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('아무것도 안 함', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('15번 문제 채점 테스트', () => {
    const id = 15;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git clone /origin .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git remote add upstream /upstream',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('upstream 안 함', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git clone /origin .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('반대로 함', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git clone /remote .',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git remote add upstream /origin',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('16번 문제 채점 테스트', () => {
    const id = 16;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git switch -c feat/somethingA',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('괜히 다시 main으로 돌아옴', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git switch -c feat/somethingA',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git checkout main',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('아무것도 안 함', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('17번 문제 채점 테스트', () => {
    const id = 17;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git pull origin main',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('아무것도 안 함', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  describe('19번 문제 채점 테스트', () => {
    const id = 19;
    afterEach(async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie);
    });

    it('베스트 성공 케이스', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git branch -D feat/somethingA',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git branch -D feat/somethingB',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', true);
    });

    it('모든 브랜치 다 지움', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git branch -D feat/somethingA',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git branch -D feat/somethingB',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git branch -D feat/somethingC',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .set('Cookie', cookie)
        .send({
          mode: 'command',
          message: 'git branch -D hotfix/somethingD',
        });

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });

    it('아무것도 안 함', async () => {
      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/command`)
        .send({
          mode: 'command',
          message: 'git status',
        });

      cookie = response.headers['set-cookie'][0].split(';')[0];

      response = await request(app.getHttpServer())
        .post(`/api/v1/quizzes/${id}/submit`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toHaveProperty('solved', false);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
