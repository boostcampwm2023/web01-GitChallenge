import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from 'winston';
import { Model } from 'mongoose';
import { ActionType, Session } from './schema/session.schema';
import { ObjectId } from 'typeorm';
import { SolvedDto } from './dto/solved.dto';

@Injectable()
export class SessionService {
  private readonly sessionMap: Map<string, Session> = new Map();
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  async createSession(): Promise<string> {
    const session = new this.sessionModel({
      problems: {},
    });
    return await session.save().then((session) => {
      this.logger.log('info', `session ${session._id as ObjectId} created`);
      const sessionId = (session._id as ObjectId).toString('hex');
      this.sessionMap.set(sessionId, session);
      return sessionId;
    });
  }

  async getContainerIdBySessionId(
    sessionId: string,
    problemId: number,
  ): Promise<string> {
    const session = await this.getSessionById(sessionId);

    if (!session.problems.get(problemId)) {
      session.problems.set(problemId, {
        status: 'solving',
        logs: [],
        containerId: '',
        graph: '',
      });
      this.logger.log('info', `session ${session._id as ObjectId} updated`);
      this.logger.log(
        'info',
        `session's new quizId: ${problemId}, document created`,
      );
    } else {
      this.logger.log(
        'info',
        `containerId: ${session.problems.get(problemId)?.containerId}`,
      );
    }
    return session.problems.get(problemId)?.containerId;
  }

  async setContainerBySessionId(
    sessionId: string,
    problemId: number,
    containerId: string,
  ): Promise<void> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId)) {
      throw new Error('problem not found');
    }
    this.logger.log(
      'info',
      `setting ${sessionId}'s containerId as ${containerId}`,
    );
    session.problems.get(problemId).containerId = containerId;
  }

  async getRecentLog(
    sessionId: string,
    problemId: number,
  ): Promise<{ mode: string; message: string }> {
    const session = await this.getSessionById(sessionId);

    const problemLogs = session?.problems.get(problemId)?.logs;
    if (!problemLogs || problemLogs.length === 0) {
      throw new Error('No execution record(이전에 명령을 실행한 적 없습니다.)');
    }

    return problemLogs[problemLogs.length - 1];
  }

  async pushLogBySessionId(
    log: { mode: ActionType; message: string },
    sessionId: string,
    problemId: number,
  ): Promise<void> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId)) {
      throw new Error('problem not found');
    }
    session.problems.get(problemId).logs.push(log);
  }

  async deleteCommandHistory(
    sessionId: string,
    problemId: number,
  ): Promise<void> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId)) {
      throw new Error('problem not found');
    }
    session.problems.delete(problemId);
  }

  private async getSessionById(id: string): Promise<Session> {
    let session = this.sessionMap.get(id);
    if (!session) {
      session = await this.sessionModel.findById(id);
      if (!session) {
        throw new Error('session not found');
      }
      this.sessionMap.set(id, session);
    }
    return session;
  }

  async saveSession(sessionId: string): Promise<void> {
    // 세션 조회 및 저장 로직
    const session = this.sessionMap.get(sessionId);
    if (session) {
      this.sessionMap.delete(sessionId);
      await session.save();
    }
  }

  async deleteSession(sessionId: string): Promise<void> {
    //soft delete
    const session = await this.getSessionById(sessionId);
    session.deletedAt = new Date();
    this.logger.log('info', `session ${session._id as ObjectId} deleted`);
  }

  async getLogObject(sessionId: string, problemId: number): Promise<any> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId)) {
      throw new Error('problem not found');
    }
    return session.problems.get(problemId);
  }

  async setQuizSolved(sessionId: string, problemId: number): Promise<void> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId)) {
      throw new Error('problem not found');
    }
    session.problems.get(problemId).status = 'solved';
  }

  async setQuizSolving(sessionId: string, problemId: number): Promise<void> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId)) {
      throw new Error('problem not found');
    }
    session.problems.get(problemId).status = 'solving';
  }

  async getSolvedProblems(sessionId: string): Promise<SolvedDto> {
    const session = await this.getSessionById(sessionId);
    const solvedDto = new SolvedDto();
    session.problems.forEach((value, key) => {
      if (value.status === 'solved') {
        solvedDto[key] = true;
      }
    });
    return solvedDto;
  }

  async getGraphById(sessionId: string, problemId: number): Promise<string> {
    const session = await this.getSessionById(sessionId);
    return session.problems.get(problemId)?.graph;
  }

  async isGraphUpdated(
    sessionId: string,
    problemId: number,
    graph: string,
  ): Promise<boolean> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId)) {
      throw new Error('problem not found');
    }
    return session.problems.get(problemId).graph !== graph;
  }

  async updateGraph(
    sessionId: string,
    problemId: number,
    graph: string,
  ): Promise<void> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId)) {
      throw new Error('problem not found');
    }
    session.problems.get(problemId).graph = graph;
  }
}
