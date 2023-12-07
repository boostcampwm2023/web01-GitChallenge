import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Inject,
  Delete,
  UseGuards,
  HttpCode,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Logger } from 'winston';
import { QuizDto } from './dto/quiz.dto';
import { QuizzesService } from './quizzes.service';
import { NotFoundResponseDto, QuizzesDto } from './dto/quizzes.dto';
import { CommandRequestDto, MODE } from './dto/command-request.dto';
import {
  CommandResponseDto,
  ForbiddenResponseDto,
} from './dto/command-response.dto';
import { SessionService } from '../session/session.service';
import { Response } from 'express';
import { ContainersService } from '../containers/containers.service';
import { SessionId } from '../session/session.decorator';
import { CommandGuard } from '../common/command.guard';
import { QuizWizardService } from '../quiz-wizard/quiz-wizard.service';
import { Fail, SubmitDto, Success } from './dto/submit.dto';
import {
  decryptObject,
  encryptObject,
  graphParser,
  preview,
} from '../common/util';
import { QuizGuard } from './quiz.guard';
import { SessionUpdateInterceptor } from '../session/session-save.intercepter';
import {
  BadRequestResponseDto,
  SharedDto,
  isDecrypted,
} from './dto/shared.dto';
import { GraphDto } from './dto/graph.dto';

@ApiTags('quizzes')
@Controller('api/v1/quizzes')
@UseInterceptors(SessionUpdateInterceptor)
export class QuizzesController {
  constructor(
    private readonly quizService: QuizzesService,
    private readonly sessionService: SessionService,
    private readonly containerService: ContainersService,
    private readonly quizWizardService: QuizWizardService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

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
  @UseGuards(CommandGuard, QuizGuard)
  @ApiNotFoundResponse({
    description: '해당 문제가 존재하지 않습니다.',
    type: NotFoundResponseDto,
  })
  @ApiOperation({ summary: 'Git 명령을 실행합니다.' })
  @ApiResponse({
    status: 200,
    description: 'Git 명령의 실행 결과(stdout/stderr)를 리턴합니다.',
    type: CommandResponseDto,
  })
  @ApiForbiddenResponse({
    description: '금지된 명령이거나, editor를 연속으로 사용했을때',
    type: ForbiddenResponseDto,
  })
  @ApiParam({ name: 'id', description: '문제 ID' })
  @ApiBody({ description: 'Command to be executed', type: CommandRequestDto })
  async runGitCommand(
    @Param('id') id: number,
    @Body() execCommandDto: CommandRequestDto,
    @Res() response: Response,
    @SessionId() sessionId: string,
  ): Promise<CommandResponseDto> {
    await this.sessionService.checkLogLength(sessionId, id);
    try {
      if (!sessionId) {
        // 세션 아이디가 없다면
        this.logger.log('info', 'no session id. creating session..');
        response.cookie(
          'sessionId',
          (sessionId = await this.sessionService.createSession()),
          {
            httpOnly: true,
          },
        ); // 세션 아이디를 생성한다.
        this.logger.log('info', `session id: ${sessionId} created`);
      }

      let containerId = await this.sessionService.getContainerIdBySessionId(
        sessionId,
        id,
      );

      // 컨테이너가 없거나, 컨테이너가 유효하지 않다면 새로 생성한다.
      if (
        !containerId ||
        !(await this.containerService.isValidateContainerId(containerId))
      ) {
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
        await this.containerService.restoreContainer(
          await this.sessionService.getLogObject(sessionId, id),
        );
      }

      // 리팩토링 필수입니다.
      let message: string, result: string, graph: string;

      // command mode
      if (execCommandDto.mode === MODE.COMMAND) {
        this.logger.log(
          'info',
          `running command "${execCommandDto.message}" for container ${containerId}`,
        );

        ({ message, result, graph } = await this.containerService.runGitCommand(
          containerId,
          execCommandDto.message,
        ));

        if (result === MODE.EDITOR) {
          this.containerService.stashApplyContainer(containerId);
          // containerId = await this.containerService.getContainer(id);
          // await this.sessionService.setContainerBySessionId(
          //   sessionId,
          //   id,
          //   containerId,
          // );
          // this.containerService.restoreContainer(
          //   await this.sessionService.getLogObject(sessionId, id),
          // );
        } else {
          this.containerService.stashContainer(containerId);
        }
      } else if (execCommandDto.mode === MODE.EDITOR) {
        // editor mode
        const { mode: recentMode, message: recentMessage } =
          await this.sessionService.getRecentLog(sessionId, id);

        // editor를 연속으로 사용했을 때
        if (recentMode === MODE.EDITOR) {
          response.status(HttpStatus.FORBIDDEN).send({
            message: '편집기 명령 순서가 아닙니다',
            error: 'Forbidden',
            statusCode: 403,
          });
          return;
        }

        this.logger.log(
          'info',
          `running editor command "${recentMessage}" for container ${containerId} with body starts with "${preview(
            execCommandDto.message,
          )}"`,
        );

        ({ message, result, graph } =
          await this.containerService.runEditorCommand(
            containerId,
            recentMessage,
            execCommandDto.message,
          ));
      } else {
        response.status(HttpStatus.BAD_REQUEST).send({
          message: '잘못된 요청입니다.',
        });
      }

      // message를 저장합니다.
      this.sessionService.pushLogBySessionId(execCommandDto, sessionId, id);

      if (
        result !== MODE.EDITOR ||
        (await this.sessionService.isGraphUpdated(sessionId, id, graph))
      ) {
        await this.sessionService.updateGraph(sessionId, id, graph);
        response.status(HttpStatus.OK).send({
          message,
          result,
          graph: graphParser(graph),
        });
      } else {
        response.status(HttpStatus.OK).send({
          message,
          result,
        });
      }

      return;
    } catch (error) {
      this.logger.log('error', error);
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
  @UseGuards(QuizGuard)
  @ApiNotFoundResponse({
    description: '해당 문제가 존재하지 않습니다.',
    type: NotFoundResponseDto,
  })
  @ApiOperation({ summary: 'Git 명령기록과, 할당된 컨테이너를 삭제합니다' })
  @ApiResponse({
    status: 200,
    description:
      'session에 저장된 command 기록과 컨테이너를 삭제하고, 실제 컨테이너도 삭제 합니다',
  })
  @ApiParam({ name: 'id', description: '문제 ID' })
  async deleteCommandHistory(
    @Param('id') id: number,
    @SessionId() sessionId: string,
  ): Promise<void> {
    if (!sessionId) return;

    try {
      const containerId = await this.sessionService.getContainerIdBySessionId(
        sessionId,
        id,
      );

      if (!containerId) {
        return;
      }

      this.containerService.deleteContainer(containerId);

      await this.sessionService.deleteCommandHistory(sessionId, id);
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

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(QuizGuard)
  @ApiNotFoundResponse({
    description: '해당 문제가 존재하지 않습니다.',
    type: NotFoundResponseDto,
  })
  @ApiOperation({ summary: '채점을 요청합니다.' })
  @ApiResponse({
    status: 200,
    description: '채점 결과를 리턴합니다.',
    type: Success,
  })
  @ApiParam({ name: 'id', description: '문제 ID' })
  async submit(
    @Param('id') id: number,
    @SessionId() sessionId: string,
  ): Promise<SubmitDto> {
    if (!sessionId) return new Fail();
    try {
      let containerId = await this.sessionService.getContainerIdBySessionId(
        sessionId,
        id,
      );

      if (
        !containerId ||
        !(await this.containerService.isValidateContainerId(containerId))
      ) {
        // 재현해서 컨테이너 발급하기
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
        await this.containerService.restoreContainer(
          await this.sessionService.getLogObject(sessionId, id),
        );
      }

      const result: boolean = await this.quizWizardService.submit(
        containerId,
        id,
      );

      if (!result) {
        await this.sessionService.setQuizSolving(sessionId, id);
        return new Fail();
      }

      await this.sessionService.setQuizSolved(sessionId, id);

      const commands = (
        await this.sessionService.getLogObject(sessionId, id)
      ).logs
        .filter((log) => log.mode === 'command')
        .map((log) => {
          if (log.message.startsWith('git')) {
            return log.message.replace('git', '`git`');
          }
          return log.message;
        });
      const encodedCommands = encryptObject({
        id,
        commands,
      });

      return new Success(encodedCommands);
    } catch (e) {
      this.logger.log('error', e);
      throw new HttpException(
        {
          message: 'Internal Server Error',
          result: 'fail',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('shared')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({
    description:
      '제공된 암호화된 문자열이 유효하지 않거나, 복호화에 실패했습니다.',
    type: BadRequestResponseDto,
  })
  @ApiOperation({ summary: '링크를 통해 공유받은 정답을 확인합니다.' })
  @ApiResponse({
    status: 200,
    description: '문제와 문제의 정답을 리턴합니다.',
    type: SharedDto,
  })
  @ApiQuery({
    name: 'answer',
    required: true,
    description: '공유받은 암호화된 문자열',
    type: String,
  })
  async shared(@Query('answer') answer: string): Promise<SharedDto> {
    try {
      const decrypted = decryptObject(answer);

      if (!isDecrypted(decrypted)) {
        throw new HttpException(
          '공유된 문제가 올바르지 않습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const quizDto = await this.quizService.getQuizById(
        parseInt(decrypted.id, 10),
      );
      return new SharedDto(decrypted.commands, quizDto);
    } catch (e) {
      this.logger.log('error', e);
      throw new HttpException(
        {
          message: '제공된 암호화된 문자열이 유효하지 않습니다.',
          result: 'fail',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @UseGuards(QuizGuard)
  @ApiNotFoundResponse({
    description: '해당 문제가 존재하지 않습니다.',
    type: NotFoundResponseDto,
  })
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

  @Get('/:id/graph')
  @UseGuards(QuizGuard)
  @ApiNotFoundResponse({
    description: '해당 문제가 존재하지 않습니다.',
    type: NotFoundResponseDto,
  })
  @ApiOperation({
    summary: 'ID를 통해 문제의 그래프 정보를 가져올 수 있습니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the graph details',
    type: GraphDto,
  })
  async getGraphById(
    @Param('id') id: number,
    @SessionId() sessionId: string,
  ): Promise<GraphDto> {
    if (!sessionId) return JSON.parse(await this.quizService.getGraphById(id));

    const graph = await this.sessionService.getGraphById(sessionId, id);
    if (!graph) {
      return JSON.parse(await this.quizService.getGraphById(id));
    } else {
      return {
        graph: graphParser(graph),
      };
    }
  }
}
