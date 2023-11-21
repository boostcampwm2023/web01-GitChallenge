// problem.dto.ts
import { ApiProperty } from '@nestjs/swagger';
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
  quizzes: QuizDto[];
}

export class QuizzesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryQuizzesDto)
  @ApiProperty({
    description: '문제 제목 리스트',
    example: [
      {
        id: 1,
        category: 'Git Start',
        quizzes: [
          { id: 3, title: 'git add & git status' },
          { id: 1, title: 'git init' },
        ],
      },
      {
        id: 2,
        category: 'Git Advanced',
        quizzes: [{ id: 4, title: 'git commit --amend' }],
      },
    ],
  })
  categories: CategoryQuizzesDto[];
}
