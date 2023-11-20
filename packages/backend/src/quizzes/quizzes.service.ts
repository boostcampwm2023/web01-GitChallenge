import { Injectable, NotFoundException } from '@nestjs/common';
import { Quiz } from './entity/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizDto } from './dto/quiz.dto';
import { CategoryQuizzesDto, QuizzesDto } from './dto/quizzes.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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

  async findAllProblemsGroupedByCategory(): Promise<QuizzesDto> {
    const categories = await this.categoryRepository.find({
      relations: ['quizzes'],
    });

    const categoryQuizzesDtos: CategoryQuizzesDto[] = categories.map(
      (category) => ({
        id: category.id,
        category: category.name,
        quizzes: category.quizzes.map((quiz) => ({
          id: quiz.id,
          title: quiz.title,
        })),
      }),
    );

    const quizzesDtos: QuizzesDto = { categories: categoryQuizzesDtos };

    return quizzesDtos;
  }
}
