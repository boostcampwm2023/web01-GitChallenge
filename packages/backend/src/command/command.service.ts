import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { MeasureExecutionTime } from '../common/execution-time.interceptor';

@Injectable()
export class CommandService {
  private readonly host: string;
  private readonly instance;
  constructor(private readonly configService: ConfigService) {
    this.host = this.configService.get<string>('CONTAINER_SERVER_HOST');
    this.instance = axios.create({
      baseURL: this.host,
      timeout: 10000,
    });
  }

  @MeasureExecutionTime()
  async executeCommand(
    ...commands: string[]
  ): Promise<{ stdoutData: string; stderrData: string }> {
    try {
      const command = commands.join('; ');
      console.log('post command:', command);
      const response = await this.instance.post('/', { command });
      console.log('response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
