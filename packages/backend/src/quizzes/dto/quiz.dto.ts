import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsArray } from 'class-validator';

export class QuizDto {
  @ApiProperty({ description: '문제 ID', example: 3 })
  @IsInt()
  readonly id: number;

  @IsString()
  @ApiProperty({ description: '문제 제목', example: 'git add & git status' })
  readonly title: string;

  @IsString()
  @ApiProperty({
    description: '문제 내용',
    example:
      '현재 변경된 파일 중에서 `achitecture.md` 파일을 제외하고 staging 해주세요.',
  })
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: '문제 핵심 키워드', example: ['add', 'status'] })
  readonly keywords: string[];

  @IsString()
  @ApiProperty({ description: '문제 카테고리', example: 'Git Start' })
  readonly category: string;

  @IsString()
  @ApiProperty({
    description: '모범 답안',
    example: '`git` status\n`git` add README.md docs/plan.md',
  })
  readonly answer: string;
}
