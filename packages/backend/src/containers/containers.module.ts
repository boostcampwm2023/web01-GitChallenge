import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { SshModule } from 'src/ssh/ssh.module';

@Module({
  imports: [SshModule],
  providers: [ContainersService],
  exports: [ContainersService],
})
export class ContainersModule {}
