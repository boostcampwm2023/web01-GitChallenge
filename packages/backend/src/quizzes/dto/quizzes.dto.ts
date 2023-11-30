// problem.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

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
          { id: 1, title: 'git init' },
          { id: 2, title: 'git config' },
          { id: 3, title: 'git add & git status' },
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

export class NotFoundResponseDto extends NotFoundException {
  constructor(message: string = '찾을 수 없는 리소스입니다.') {
    super(message);
  }

  @ApiProperty({
    description: '없는 문제를 조회했을때',
    example: 'Quiz 1212 not found',
  })
  message: string;

  @ApiProperty({
    description: `Not Found`,
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    description: `statusCode`,
    example: 404,
  })
  statusCode: number;
}
