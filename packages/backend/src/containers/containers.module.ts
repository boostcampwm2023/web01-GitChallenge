import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';

@Module({
  providers: [ContainersService],
  exports: [ContainersService],
})
export class ContainersModule {}
