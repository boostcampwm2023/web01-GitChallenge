import { ApiProperty } from '@nestjs/swagger';

export class CommandResponseDto {
  @ApiProperty({
    description: '실행한 stdout/stderr 결과',
    example: '* main\n',
  })
  message: string;

  @ApiProperty({
    description: '실행 결과 요약(stdout => success, stderr => fail, vi)',
    example: 'success',
  })
  result: 'success' | 'fail' | 'vi';

  @ApiProperty({
    description: 'git 그래프 상황(아직 미구현)',
    example: '아직 미구현이에요',
  })
  graph?: string;
}
