import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SSHConnectionPoolService } from './ssh.connection-pool.service';
import { SshService } from './ssh.service';

const MAX_CONNECTION = 10;

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SSHConnectionPoolService,
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('CONTAINER_SSH_HOST');
        const port = parseInt(
          configService.get<string>('CONTAINER_SSH_PORT'),
          10,
        );
        const username = configService.get<string>('CONTAINER_SSH_USERNAME');
        const password = configService.get<string>('CONTAINER_SSH_PASSWORD');

        return new SSHConnectionPoolService(
          host,
          port,
          username,
          password,
          MAX_CONNECTION,
        );
      },
      inject: [ConfigService],
    },
    SshService,
  ],
  exports: [SSHConnectionPoolService, SshService],
})
export class SshModule {}
