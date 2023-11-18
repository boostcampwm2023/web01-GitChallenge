import { IsInt, IsString, IsArray } from 'class-validator';

export class ProblemDto {
  @IsInt()
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly keywords: string[];

  @IsString()
  readonly category: string;
}
