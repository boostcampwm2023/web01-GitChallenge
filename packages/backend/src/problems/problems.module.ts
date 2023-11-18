import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entity/problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
