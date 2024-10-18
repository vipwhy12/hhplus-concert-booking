import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PointDto {
  @ApiProperty({ description: '포인트' })
  @IsNumber({}, { message: 'amount는 숫자여야 합니다.' })
  amount: number;
}
