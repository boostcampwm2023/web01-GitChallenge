// problem.dto.ts
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProblemDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;
}

export class CategoryProblemsDto {
  @IsString()
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProblemDto)
  problems: ProblemDto[];
}
