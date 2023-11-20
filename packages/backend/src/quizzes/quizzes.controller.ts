import { Controller, Get, Param } from '@nestjs/common';
import { QuizDto } from './dto/quiz.dto';
import { QuizzesService } from './quizzes.service';

@Controller('api/v1/quizzes')
export class QuizzesController {
  constructor(private readonly quizService: QuizzesService) {}

  @Get(':id')
  async getProblemById(@Param('id') id: number): Promise<QuizDto> {
    const quizDto = await this.quizService.getQuizById(id);

    return quizDto;
  }
}
