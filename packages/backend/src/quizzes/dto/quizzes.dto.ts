// problem.dto.ts
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuizDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;
}

export class CategoryQuizzesDto {
  @IsInt()
  id: number;

  @IsString()
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizDto)
  problems: QuizDto[];
}

export class QuizzesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryQuizzesDto)
  categories: CategoryQuizzesDto[];
}
