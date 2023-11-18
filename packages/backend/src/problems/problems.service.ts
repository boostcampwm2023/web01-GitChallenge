import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from './entity/problem.entity';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CategoryProblemsDto } from './dto/problems.dto';
import { ProblemDto } from './dto/problem.dto';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getProblemById(id: number): Promise<ProblemDto> {
    const problem = await this.problemRepository.findOne({
      where: { id },
      relations: ['keywords', 'category'],
    });

    if (!problem) {
      throw new NotFoundException(`Problem${id} not found`);
    }

    const problemDto: ProblemDto = {
      id: problem.id,
      title: problem.title,
      description: problem.description,
      keywords: problem.keywords.map((keyword) => keyword.keyword),
      category: problem.category.name,
    };

    return problemDto;
  }

  async findAllProblemsGroupedByCategory(): Promise<CategoryProblemsDto[]> {
    const categories = await this.categoryRepository.find({
      relations: ['problems'],
    });

    return categories.map((category) => ({
      category: category.name,
      problems: category.problems.map((problem) => ({
        id: problem.id,
        title: problem.title,
      })),
    }));
  }
}
