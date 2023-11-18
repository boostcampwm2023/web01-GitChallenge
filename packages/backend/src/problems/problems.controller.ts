import { Controller, Get, Param } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemDto } from './dto/problem.dto';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get(':id')
  async getProblemById(@Param('id') id: number): Promise<ProblemDto> {
    const problem = await this.problemsService.getProblemById(id);

    const problemDto: ProblemDto = {
      id: problem.id,
      title: problem.title,
      description: problem.description,
      keywords: problem.keywords.map((keyword) => keyword.keyword),
      category: problem.category.name,
    };

    return problemDto;
  }
}
