import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { PointDto } from '../dto';

export function ApiPoints() {
  return applyDecorators(ApiTags('points'), ApiBearerAuth());
}

export function ApiGetPoints() {
  return applyDecorators(
    ApiOperation({
      summary: '포인트 조회',
      description: '사용자의 포인트를 조회합니다.',
    }),
  );
}

export function ApiChargePoints() {
  return applyDecorators(
    ApiOperation({
      summary: '포인트 충전',
      description: '사용자의 포인트를 충전합니다.',
    }),
    ApiBody({ type: PointDto }),
  );
}
