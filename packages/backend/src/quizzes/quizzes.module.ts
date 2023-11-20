import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entity/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Category])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
