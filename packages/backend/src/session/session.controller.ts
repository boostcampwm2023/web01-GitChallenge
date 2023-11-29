import { Controller, Delete, Res, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionGuard } from './session.guard';
import { SessionId } from './session.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('session')
@Controller('api/v1/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete()
  @UseGuards(SessionGuard)
  @ApiOperation({ summary: '세션을 삭제합니다.' })
  @ApiResponse({
    status: 200,
    description: '세션을 삭제합니다.',
  })
  async deleteSession(
    @SessionId() sessionId: string,
    @Res() response: Response,
  ) {
    response.clearCookie('sessionId');
    this.sessionService.deleteSession(sessionId);
    response.end();
    return;
  }
}
