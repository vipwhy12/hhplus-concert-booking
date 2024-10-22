import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function ApiWaitingQueueController() {
  return applyDecorators(ApiTags('WaitingQueues'));
}

export function ApiGetWaitingQueue() {
  return applyDecorators(
    ApiOperation({ summary: '대기열 정보 조회' }),
    ApiResponse({
      status: 200,
      description: '대기열 정보를 반환',
      // type: WaitingQueueResponseDto,
    }),
  );
}

export function ApiAddToWaitingQueue() {
  return applyDecorators(
    ApiOperation({ summary: '대기열에 추가' }),
    ApiResponse({
      status: 201,
      description: '대기열에 성공적으로 추가됨',
      // type:
    }),
  );
}
