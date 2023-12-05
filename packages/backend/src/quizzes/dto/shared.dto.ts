import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { QuizDto } from './quiz.dto';

export class Decrypted {
  readonly id: string;
  readonly commands: string[];
}

export function isDecrypted(obj: unknown): obj is Decrypted {
  const isObject = (val: unknown): val is { [key: string]: unknown } =>
    typeof val === 'object' && val !== null;

  if (!isObject(obj)) {
    return false;
  }

  return (
    typeof obj.id === 'string' &&
    Array.isArray(obj.commands) &&
    obj.commands.every((cmd) => typeof cmd === 'string')
  );
}

export class SharedDto {
  @ApiProperty({
    description: '공유받은 답안',
    example: '["git status", "git add docs/plan.md"]',
  })
  @IsArray()
  readonly answer: string[];

  @ApiProperty({
    description: '공유받은 답안의 문제 상황',
    example: {
      id: 3,
      title: 'git add & git status',
      description:
        '현재 변경된 파일 중에서 `achitecture.md` 파일을 제외하고 staging 해주세요.',
      keywords: ['add', 'status'],
      category: 'Git Start',
    },
  })
  readonly quiz: QuizDto;

  constructor(answer: string[], quiz: QuizDto) {
    this.answer = answer;
    this.quiz = quiz;
  }
}

export class BadRequestResponseDto {
  @ApiProperty({
    description:
      '제공된 암호화된 문자열이 유효하지 않거나, 복호화에 실패했습니다.',
    example: '공유된 문제가 올바르지 않습니다.',
  })
  message: string;

  @ApiProperty({
    description: `Bad Request`,
    example: 'Bad Request',
  })
  error?: string;

  @ApiProperty({
    description: `statusCode`,
    example: 400,
  })
  statusCode: number;

  constructor(message: string, error?: string) {
    this.message = message;
    this.statusCode = 400;
    this.error = error;
  }
}
