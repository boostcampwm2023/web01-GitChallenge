import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entity/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { ContainersModule } from '../containers/containers.module';
import { SessionModule } from '../session/session.module';
import { Keyword } from './entity/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Category, Keyword]),
    ContainersModule,
    SessionModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
