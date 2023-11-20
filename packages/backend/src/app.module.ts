import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProblemsModule } from './problems/problems.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProblemsModule, QuizzesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
