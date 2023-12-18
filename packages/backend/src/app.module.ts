import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { format } from 'winston';
import { typeOrmConfig } from './configs/typeorm.config';
import { QuizzesModule } from './quizzes/quizzes.module';
import { LoggingInterceptor } from './common/logging.interceptor';
import { QuizWizardModule } from './quiz-wizard/quiz-wizard.module';
import { AiModule } from './ai/ai.module';
import { CommandModule } from './command/command.module';
import { ContainersModule } from './containers/containers.module';
import { ContainersService } from './containers/containers.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuizzesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          filename: 'logs/backend-application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
    QuizWizardModule,
    AiModule,
    CommandModule,
    ContainersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    ContainersService,
  ],
})
export class AppModule {}
