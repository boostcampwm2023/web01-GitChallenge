import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from './entity/problem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
  ) {}

  async getProblemById(id: number): Promise<Problem> {
    const problem = await this.problemRepository.findOne({
      where: { id },
      relations: ['keywords', 'category'],
    });

    if (!problem) {
      throw new NotFoundException(`Problem${id} not found`);
    }

    return problem;
  }
}
