import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { QuizDto } from './dto/quiz.dto';
import { QuizzesService } from './quizzes.service';
import { QuizzesDto } from './dto/quizzes.dto';
import { CommandRequestDto } from './dto/command-request.dto';
import { CommandResponseDto } from './dto/command-response.dto';
import { SessionService } from '../session/session.service';
import { Request, Response } from 'express';
import { ContainersService } from '../containers/containers.service';

@Controller('api/v1/quizzes')
export class QuizzesController {
  constructor(
    private readonly quizService: QuizzesService,
    private readonly sessionService: SessionService,
    private readonly containerService: ContainersService,
  ) {}

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
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<CommandResponseDto> {
    let sessionId = request.cookies?.sessionId;

    if (!sessionId) {
      // 세션 아이디가 없다면
      response.cookie(
        'sessionId',
        (sessionId = await this.sessionService.createSession()),
        {
          httpOnly: true,
          // 개발 이후 활성화 시켜야함
          // secure: true,
        },
      ); // 세션 아이디를 생성한다.
    }

    // 살려야함
    // let containerId = await this.sessionService.getContainerIdBySessionId(
    //   sessionId,
    //   id,
    // );

    // 살려야함
    // if (!this.containerService.isValidateContainerId(containerId)) {
    //   containerId = await this.containerService.getContainer(id);
    //   await this.sessionService.setContainerBySessionId(
    //     sessionId,
    //     id,
    //     containerId,
    //   );
    // }

    try {
      const { message, result } = await this.containerService.runGitCommand(
        'testContainer',
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
