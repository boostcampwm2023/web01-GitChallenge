import { Module } from '@nestjs/common';
import { SessionService } from './session.service';

@Module({
  providers: [SessionService]
})
export class SessionModule {}
