import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuizDto } from './dto/quiz.dto';
import { QuizzesService } from './quizzes.service';
import { QuizzesDto } from './dto/quizzes.dto';
import { CommandRequestDto } from './dto/command-request.dto';
import { CommandResponseDto } from './dto/command-response.dto';

@Controller('api/v1/quizzes')
export class QuizzesController {
  constructor(private readonly quizService: QuizzesService) {}

  @Get(':id')
  async getProblemById(@Param('id') id: number): Promise<QuizDto> {
    const quizDto = await this.quizService.getQuizById(id);

    return quizDto;
  }

  @Get('/')
  async getProblemsGroupedByCategory(): Promise<QuizzesDto> {
    return this.quizService.findAllProblemsGroupedByCategory();
  }

  @Post(':id/command')
  async runGitCommand(
    @Param('id') id: number,
    @Body() execCommandDto: CommandRequestDto,
  ): Promise<CommandResponseDto> {
    try {
      const { message, result } = await this.quizService.runGitCommand(
        execCommandDto.command,
      );
      return {
        message,
        result,
        // graph: 필요한 경우 여기에 추가
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          result: 'fail',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
