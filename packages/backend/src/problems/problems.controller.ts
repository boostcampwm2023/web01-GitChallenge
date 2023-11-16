import { Controller, Get, Param } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { Problem } from './problem.entity';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get(':id')
  async getProblemById(@Param('id') id: number): Promise<Problem> {
    return await this.problemsService.getProblemById(id);
  }
}
