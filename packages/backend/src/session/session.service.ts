import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './schema/session.schema';
import { ObjectId } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {
    const testSession = new this.sessionModel({
      problems: {},
    });
    testSession.save();
  }

  async createSession(): Promise<string> {
    const session = new this.sessionModel({
      problems: {},
    });
    return await session.save().then((session) => {
      console.log('session created');
      return (session._id as ObjectId).toString('hex');
    });
  }

  async getContainerIdBySessionId(
    sessionId: string,
    problemId: number,
  ): Promise<string> {
    const session = await this.getSessionById(sessionId);

    if (!session.problems[problemId]) {
      session.problems.set(problemId.toString(), {
        status: 'solving',
        logs: [],
        containerId: '',
      });
      console.log('session updated');
      console.log(session.problems[problemId]);
      await session.save();
    }
    return session.problems[problemId]?.containerId;
  }

  async setContainerBySessionId(
    sessionId: string,
    problemId: number,
    containerId: string,
  ): Promise<void> {
    const session = await this.getSessionById(sessionId);
    if (!session.problems.get(problemId.toString())) {
      throw new Error('problem not found');
    }
    session.problems.get(problemId.toString()).containerId = containerId;
    session.save();
  }

  private async getSessionById(id: string): Promise<Session> {
    return await this.sessionModel.findById(id);
  }
}
