import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { AiResponseDto } from './dto/ai.dto';
import { Logger } from 'winston';
import { preview } from '../common/util';

@Injectable()
export class AiService {
  private readonly headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  private readonly instance = axios.create({
    baseURL:
      'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-002',
    timeout: 50000,
    headers: this.headers,
  });

  constructor(
    private configService: ConfigService,
    @Inject('winston') private readonly logger: Logger,
  ) {
    this.instance.interceptors.request.use((config) => {
      config.headers['X-NCP-CLOVASTUDIO-API-KEY'] = this.configService.get(
        'X-NCP-CLOVASTUDIO-API-KEY',
      );
      config.headers['X-NCP-APIGW-API-KEY'] = this.configService.get(
        'X-NCP-APIGW-API-KEY',
      );
      config.headers['X-NCP-CLOVASTUDIO-REQUEST-ID'] = this.configService.get(
        'X-NCP-CLOVASTUDIO-REQUEST-ID',
      );
      return config;
    });
  }
  async getApiResponse(message: string): Promise<AiResponseDto> {
    const response = await this.instance.post('/', {
      messages: [
        {
          role: 'system',
          content:
            '- Git 전문가입니다.\\n- Git에 대한 질문만 대답합니다.\\n- Git 사용이 낯선 사람들에게 질문을 받습니다.\\n- Git 설치는 이미 마쳤습니다.\\n- 설명은 이해하기 쉽게 명료하고 간단하게 명령어 위주로 대답합니다.\\n- 질문한 것만 대답합니다.\\n- Git 명령어로만 해답을 제시합니다.\\n- 예를 들어 설명하지 않는다.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      topP: 0.8,
      topK: 0,
      maxTokens: 512,
      temperature: 0.3,
      repeatPenalty: 5.0,
      stopBefore: [],
      includeAiFilters: true,
    });

    this.logger.log(
      'info',
      `AI response: ${preview(response.data.result.message.content)}`,
    );

    return { message: response.data.result.message.content };
  }
}
