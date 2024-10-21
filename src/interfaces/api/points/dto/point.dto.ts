import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PointRequestDto {
  @ApiProperty({ description: '충전할 포인트 양', example: 1000 })
  @IsNumber({}, { message: 'amount는 숫자여야 합니다.' })
  amount: number;
}
