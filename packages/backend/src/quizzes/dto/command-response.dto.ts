import { ApiProperty } from '@nestjs/swagger';

export const RESULT = {
  SUCCESS: 'success',
  FAIL: 'fail',
  EDITOR: 'editor',
} as const;

type ResultType = (typeof RESULT)[keyof typeof RESULT];

export class CommandResponseDto {
  @ApiProperty({
    description: '실행한 stdout/stderr 결과',
    example: '* main\n',
  })
  message: string;

  @ApiProperty({
    description: `실행 결과 요약(stdout => "success", stderr => "fail", 에디터 사용 => "editor")`,
    example: 'success',
  })
  result: ResultType;

  @ApiProperty({
    description: 'git 그래프 상황',
    example:
      '[\n' +
      '    {\n' +
      '        "id": "0b6bb091c739e7aec2cb724378d50e486a914768",\n' +
      '        "parentId": "",\n' +
      '        "message": "docs: plan.md",\n' +
      '        "refs": "HEAD -> main"\n' +
      '    }\n' +
      ']\n',
  })
  graph?: object[];

  @ApiProperty({
    description: '현재 브랜치(reference)위치',
    example: 'main',
  })
  ref: string;
}
export class ForbiddenResponseDto {
  @ApiProperty({
    description: '금지된 명령이거나, editor를 연속으로 사용했을때',
    example: '금지된 명령입니다',
  })
  message: string;

  @ApiProperty({
    description: `Forbidden`,
    example: 'Forbidden',
  })
  error: string;

  @ApiProperty({
    description: `statusCode`,
    example: 403,
  })
  statusCode: number;
}
