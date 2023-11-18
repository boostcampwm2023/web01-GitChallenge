import { Controller, Get, Param } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemDto } from './dto/problem.dto';

@Controller('api/v1/problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get(':id')
  async getProblemById(@Param('id') id: number): Promise<ProblemDto> {
    const problem = await this.problemsService.getProblemById(id);

    return problem;
  }

  @Get('/')
  async getProblemsGroupedByCategory() {
    return this.problemsService.findAllProblemsGroupedByCategory();
  }
}
