import { ApiProperty } from '@nestjs/swagger';

export class CommandRequestDto {
  @ApiProperty({ description: '실행할 명령문', example: 'git branch' })
  command: string;
}
