import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PointResponseDto } from 'src/interfaces/api/points/dto/points.response';

export function SwaggerPointController() {
  return applyDecorators(ApiTags('Points'), ApiBearerAuth());
}

export function SwaggerGetPoints() {
  return applyDecorators(
    ApiOperation({ summary: '유저 포인트 조회' }),
    ApiResponse({
      status: 200,
      description: '현재 포인트 반환',
      type: PointResponseDto,
    }),
  );
}

export function SwaggerChargePoints() {
  return applyDecorators(
    ApiOperation({ summary: '포인트 충전' }),
    ApiResponse({
      status: 200,
      description: '충전된 포인트 반환',
      type: PointResponseDto,
    }),
  );
}
