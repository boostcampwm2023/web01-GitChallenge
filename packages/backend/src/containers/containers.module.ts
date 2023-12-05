import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { SshModule } from '../ssh/ssh.module';
import { CommandModule } from '../command/command.module';

@Module({
  imports: [SshModule, CommandModule],
  providers: [ContainersService],
  exports: [ContainersService],
})
export class ContainersModule {}
