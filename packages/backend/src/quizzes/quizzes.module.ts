import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entity/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { ContainersModule } from '../containers/containers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Category]), ContainersModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
