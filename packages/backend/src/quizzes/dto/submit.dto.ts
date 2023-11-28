import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class Success {
  @ApiProperty({ example: true })
  @IsBoolean()
  solved = true;

  @ApiProperty({ example: 'gitchallenge.com/api/v1/quizzes/shared?answer=””' })
  @IsString()
  link: string;

  constructor(link: string) {
    this.link = link;
  }
}

export class Fail {
  @ApiProperty({ example: false })
  solved = false;
}

export type SubmitDto = Success | Fail;
