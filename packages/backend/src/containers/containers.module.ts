import { Global, Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { CommandModule } from '../command/command.module';

@Global()
@Module({
  imports: [CommandModule],
  providers: [ContainersService],
  exports: [ContainersService],
})
export class ContainersModule {}
