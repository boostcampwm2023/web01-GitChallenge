import { Inject, Injectable } from '@nestjs/common';
import { Quiz } from './entity/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizDto } from './dto/quiz.dto';
import { CategoryQuizzesDto, QuizzesDto } from './dto/quizzes.dto';
import { Category } from './entity/category.entity';
import fs from 'fs';
import * as Papa from 'papaparse';
import { Keyword } from './entity/keyword.entity';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Keyword)
    private keywordRepository: Repository<Keyword>,
    private configService: ConfigService,
    @Inject('winston') private readonly logger: Logger,
  ) {
    if (configService.get<string>('NODE_ENV') !== 'test') {
      this.initQiuzzes();
    }
  }

  private async initQiuzzes() {
    this.logger.log('info', `read git-challenge-quiz.csv`);
    const quizData = await this.readCsvFile('git-challenge-quiz.csv');

    // Category와 Keyword를 먼저 생성
    const categories = {};
    const keywords = {};

    for (const data of quizData) {
      // Category 처리
      if (!categories[data.category]) {
        let category = new Category();
        category.name = data.category;
        this.logger.log('info', `add ${category.name} to categories`);
        category = await this.categoryRepository.save(category);
        categories[data.category] = category;
      }

      // Keyword 처리
      const keywordList = data.keyword.split(',');
      for (const kw of keywordList) {
        const trimmedKw = kw.trim();
        if (!keywords[trimmedKw]) {
          let keyword = new Keyword();
          keyword.keyword = trimmedKw;
          this.logger.log('info', `add ${keyword.keyword} to keywords`);
          keyword = await this.keywordRepository.save(keyword);
          keywords[trimmedKw] = keyword;
        }
      }
    }

    // Quiz 생성
    for (const data of quizData) {
      const quiz = new Quiz();
      quiz.title = data.title;
      quiz.description = data.description;
      quiz.category = categories[data.category];
      quiz.id = data.id;
      quiz.answer = data.answer || '';
      quiz.graph = data.graph || '';
      quiz.ref = data.ref || '';

      const keywordList = data.keyword.split(',').map((kw) => kw.trim());
      quiz.keywords = keywordList.map((kw) => keywords[kw]);

      this.logger.log('info', `add ${quiz.title} to quizzes`);
      await this.quizRepository.save(quiz);
    }
  }

  private readCsvFile(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const file = fs.createReadStream(filePath);
      const results = [];

      Papa.parse(file, {
        header: true,
        step: (row) => {
          results.push(row.data);
        },
        complete: () => {
          resolve(results);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  async isQuizExist(id: number): Promise<boolean> {
    return await this.quizRepository.exist({ where: { id } });
  }
  async getQuizById(id: number): Promise<QuizDto> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['keywords', 'category'],
    });

    const quizDto: QuizDto = {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      keywords: quiz.keywords.map((keyword) => keyword.keyword),
      category: quiz.category.name,
      answer: quiz.answer.split('\\n'),
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
        quizzes: category.quizzes
          .map((quiz) => ({
            id: quiz.id,
            title: quiz.title,
          }))
          .sort((a, b) => a.id - b.id),
      }),
    );

    const quizzesDtos: QuizzesDto = { categories: categoryQuizzesDtos };

    return quizzesDtos;
  }

  async getGraphById(id: number): Promise<string> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
    });

    return quiz.graph;
  }

  async getRefById(id: number): Promise<string> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
    });

    return quiz.ref;
  }
}
