import { Injectable, NotFoundException } from '@nestjs/common';
import { Quiz } from './entity/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizDto } from './dto/quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}
  async getQuizById(id: number): Promise<QuizDto> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['keywords', 'category'],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz ${id} not found`);
    }

    const quizDto: QuizDto = {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      keywords: quiz.keywords.map((keyword) => keyword.keyword),
      category: quiz.category.name,
    };

    return quizDto;
  }
}
