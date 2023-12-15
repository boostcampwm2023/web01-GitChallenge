import { Body, Controller, Post } from '@nestjs/common';
import { AiRequestDto, AiResponseDto } from './dto/ai.dto';
import { AiService } from './ai.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}
  @Post()
  @ApiOperation({ summary: 'AI 답변을 받아옵니다.' })
  @ApiResponse({
    status: 200,
    description: 'AI 답변을 받아옵니다.',
    type: AiResponseDto,
  })
  async ai(@Body() aiDto: AiRequestDto): Promise<AiResponseDto> {
    return await this.aiService.getApiResponse(aiDto.message);
  }
}
