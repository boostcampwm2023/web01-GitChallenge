import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Injectable()
export class QuizGuard implements CanActivate {
  constructor(private readonly quizService: QuizzesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const quizId = request.params.id;
    if (!(await this.quizService.isQuizExist(quizId))) {
      throw new NotFoundException(`Quiz ${quizId} not found`);
    }
    return true;
  }
}
