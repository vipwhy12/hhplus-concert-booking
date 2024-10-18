import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';

// Waiting Queues 컨트롤러의 태그 정의
export function ApiWaitingQueueTags() {
  return applyDecorators(
    ApiTags('Waiting Queues'), // Swagger 태그 정의
  );
}

// Get Waiting Queue by ID 메서드의 Swagger 설정
export function ApiGetWaitingQueue() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Waiting Queue by ID',
      description: '특정 대기열 ID에 대한 대기열 정보를 반환합니다.',
    }),
    ApiHeader({
      name: 'waiting-queues',
      description: '대기열의 고유 식별자(UUID)',
    }),
    ApiResponse({
      status: 200,
      description: '대기열 정보가 성공적으로 반환되었습니다.',
    }),
    ApiResponse({
      status: 400,
      description:
        '잘못된 요청입니다. UUID가 올바르지 않거나 파싱할 수 없습니다.',
    }),
    ApiResponse({ status: 404, description: '대기열을 찾을 수 없습니다.' }),
  );
}

// Add to Waiting Queue 메서드의 Swagger 설정
export function ApiAddToWaitingQueue() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add to Waiting Queue',
      description: '새로운 요청을 대기열에 추가합니다.',
    }),
    ApiResponse({
      status: 201,
      description: '대기열에 성공적으로 추가되었습니다.',
    }),
    ApiResponse({ status: 400, description: '잘못된 요청입니다.' }),
  );
}
