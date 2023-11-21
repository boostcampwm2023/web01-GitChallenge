import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './configs/typeorm.config';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuizzesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
