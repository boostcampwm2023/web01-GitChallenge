import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Logger } from 'winston';
import { preview } from '../common/util';

@Injectable()
export class CommandService {
  private readonly host: string;
  private readonly instance;
  constructor(
    private readonly configService: ConfigService,
    @Inject('winston') private readonly logger: Logger,
  ) {
    this.host = this.configService.get<string>('CONTAINER_SERVER_HOST');
    this.instance = axios.create({
      baseURL: this.host,
      timeout: 10000,
    });
  }

  async executeCommand(
    ...commands: string[]
  ): Promise<{ stdoutData: string; stderrData: string }> {
    try {
      const command = commands.join('; ');
      this.logger.log('info', `command: ${preview(command, 40)}`);
      const response = await this.instance.post('/', { command });
      return response.data;
    } catch (error) {
      this.logger.log('info', error);
    }
  }
}
