import { ApiProperty } from '@nestjs/swagger';

export class CommandRequestDto {
  @ApiProperty({
    description:
      '실행할 명령 모드. 예: "command" (명령 실행), "editor" (에디터 명령)',
    example: 'command',
  })
  mode: string;

  @ApiProperty({
    description:
      '실행할 명령문 or 에디터 작성 본문. 예: "git status (명령 실행), "feat: tmp.js 파일 제거" (에디터 명령)',
    example: 'git status',
  })
  message: string;
}
