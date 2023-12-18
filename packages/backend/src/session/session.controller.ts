import { Controller, Delete, Get, Res, UseInterceptors } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionId } from './session.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SessionUpdateInterceptor } from './session-save.intercepter';
import { SolvedDto } from './dto/solved.dto';

@ApiTags('session')
@Controller('api/v1/session')
@UseInterceptors(SessionUpdateInterceptor)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete()
  @ApiOperation({ summary: '세션을 삭제합니다.' })
  @ApiResponse({
    status: 200,
    description: '세션을 삭제합니다.',
  })
  async deleteSession(
    @SessionId() sessionId: string,
    @Res() response: Response,
  ) {
    if (!sessionId) {
      response.end();
      return;
    }

    response.clearCookie('sessionId');
    this.sessionService.deleteSession(sessionId);
    response.end();
    return;
  }

  @Get('/solved')
  @ApiOperation({ summary: '해결한 문제들을 알려줍니다' })
  @ApiResponse({
    status: 200,
    description: '해결한 문제들을 알려줍니다',
    type: SolvedDto,
  })
  async getSolvedProblems(@SessionId() sessionId: string): Promise<SolvedDto> {
    if (!sessionId) {
      return new SolvedDto();
    }

    return await this.sessionService.getSolvedProblems(sessionId);
  }
}
