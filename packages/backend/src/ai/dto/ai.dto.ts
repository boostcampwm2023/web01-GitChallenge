import { ApiProperty } from '@nestjs/swagger';

export class AiRequestDto {
  @ApiProperty({
    description: '질문할 내용',
    example: 'git이 뭐야?',
  })
  message: string;
}

export class AiResponseDto {
  @ApiProperty({
    description: '답변 내용',
    example:
      'Git은 분산 버전 관리 시스템(Distributed Version Control System)으로, 소스 코드의 버전을 관리하고 협업을 지원하는 도구입니다. Git은 다음과 같은 특징을 가지고 있습니다.\\n\\n1. **분산 저장소**: Git은 중앙 집중식 저장소가 아닌 분산 저장소를 사용합니다. 각 사용자는 자신의 컴퓨터에 저장소를 가지고 있으며, 이를 로컬 저장소라고 합니다.\\n2. **빠른 속도**: Git은 빠른 속도로 파일을 처리할 수 있습니다. 이는 Git이 데이터를 압축하여 저장하고, 해시 함수를 이용하여 파일을 빠르게 검색하기 때문입니다.\\n3. **버전 관리**: Git은 소스 코드의 버전을 관리합니다. 사용자는 파일을 수정하고 커밋(commit)하면, 해당 파일의 이전 버전과 이후 버전을 모두 저장할 수 있습니다.\\n4. **협업 지원**: Git은 협업을 지원합니다. 사용자는 다른 사용자와 함께 작업을 할 수 있으며, 서로의 작업 내용을 공유할 수 있습니다.\\n5. **명령어 기반**: Git은 명령어 기반으로 동작합니다. 사용자는 Git 명령어를 입력하여 저장소를 관리하고, 파일을 수정할 수 있습니다.\\n\\nGit은 다양한 프로그래밍 언어와 운영체제에서 사용할 수 있으며, 많은 개발자들이 Git을 이용하여 소스 코드를 관리하고 있습니다.',
  })
  message: string;
}
