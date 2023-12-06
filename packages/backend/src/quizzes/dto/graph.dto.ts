import { ApiProperty } from '@nestjs/swagger';

export class GraphDto {
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
  graph: object[];
}
