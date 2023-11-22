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
  Inject,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Logger } from 'winston';
import { QuizDto } from './dto/quiz.dto';
import { QuizzesService } from './quizzes.service';
import { QuizzesDto } from './dto/quizzes.dto';
import { CommandRequestDto } from './dto/command-request.dto';
import { CommandResponseDto } from './dto/command-response.dto';
import { SessionService } from '../session/session.service';
import { Request, Response } from 'express';
import { ContainersService } from '../containers/containers.service';

@ApiTags('quizzes')
@Controller('api/v1/quizzes')
export class QuizzesController {
  constructor(
    private readonly quizService: QuizzesService,
    private readonly sessionService: SessionService,
    private readonly containerService: ContainersService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'ID를 통해 문제 정보를 가져올 수 있습니다.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the quiz details',
    type: QuizDto,
  })
  @ApiParam({ name: 'id', description: '문제 ID' })
  async getProblemById(@Param('id') id: number): Promise<QuizDto> {
    const quizDto = await this.quizService.getQuizById(id);

    return quizDto;
  }

  @Get('/')
  @ApiOperation({
    summary: '카테고리 별로 모든 문제의 제목과 id를 가져올 수 있습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '카테고리 별로 문제의 제목과 id가 리턴됩니다.',
    type: QuizzesDto,
  })
  async getProblemsGroupedByCategory(): Promise<QuizzesDto> {
    return this.quizService.findAllProblemsGroupedByCategory();
  }

  @Post(':id/command')
  @ApiOperation({ summary: 'Git 명령을 실행합니다.' })
  @ApiResponse({
    status: 200,
    description: 'Git 명령의 실행 결과(stdout/stderr)를 리턴합니다.',
    type: CommandResponseDto,
  })
  @ApiParam({ name: 'id', description: '문제 ID' })
  @ApiBody({ description: 'Command to be executed', type: CommandRequestDto })
  async runGitCommand(
    @Param('id') id: number,
    @Body() execCommandDto: CommandRequestDto,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<CommandResponseDto> {
    try {
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

      let containerId = await this.sessionService.getContainerIdBySessionId(
        sessionId,
        id,
      );

      if (!(await this.containerService.isValidateContainerId(containerId))) {
        this.logger.log(
          'info',
          'no docker container or invalid container Id. creating container..',
        );
        containerId = await this.containerService.getContainer(id);
        await this.sessionService.setContainerBySessionId(
          sessionId,
          id,
          containerId,
        );
      }

      this.logger.log(
        'info',
        `running command "${execCommandDto.command}" for container ${containerId}`,
      );

      const { message, result } = await this.containerService.runGitCommand(
        containerId,
        execCommandDto.command,
      );

      this.sessionService.pushLogBySessionId(
        execCommandDto.command,
        sessionId,
        id,
      );

      response.status(HttpStatus.OK).send({
        message,
        result,
        // graph: 필요한 경우 여기에 추가
      });
      return;
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

  @Delete(':id/command')
  @ApiOperation({ summary: 'Git 명령기록과, 할당된 컨테이너를 삭제합니다' })
  @ApiResponse({
    status: 200,
    description:
      'session에 저장된 command 기록과 컨테이너를 삭제하고, 실제 컨테이너도 삭제 합니다',
  })
  @ApiParam({ name: 'id', description: '문제 ID' })
  async deleteCommandHistory(
    @Param('id') id: number,
    @Req() request: Request,
  ): Promise<void> {
    try {
      const sessionId = request.cookies?.sessionId;

      if (!sessionId) {
        return;
      }

      const containerId = await this.sessionService.getContainerIdBySessionId(
        sessionId,
        id,
      );

      if (!containerId) {
        return;
      }

      this.containerService.deleteContainer(containerId);

      this.sessionService.deleteCommandHistory(sessionId, id);
    } catch (e) {
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
