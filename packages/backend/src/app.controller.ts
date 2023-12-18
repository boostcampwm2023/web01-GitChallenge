import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ContainersService } from './containers/containers.service';

@Controller('api/v1')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly containersService: ContainersService,
  ) {}

  @Get('/health')
  checkHealth(): string {
    return this.containersService.isInitialized() ? 'OK' : 'Initializing';
  }
}
