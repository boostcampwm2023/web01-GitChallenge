import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class Success {
  @ApiProperty({ example: true })
  @IsBoolean()
  solved = true;

  @ApiProperty({
    description: '인코딩된 문제 풀이 과정과 문제 번호',
    example: '6251ee88d6e378b5d6b862447d151dab:aa88c19acf3da6(좀 더 길어요)',
  })
  @IsString()
  slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }
}

export class Fail {
  @ApiProperty({ example: false })
  solved = false;
}

export type SubmitDto = Success | Fail;
