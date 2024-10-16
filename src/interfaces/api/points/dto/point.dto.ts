import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PointDto {
  @ApiProperty({ description: '유저 아이디' })
  @IsNumber({}, { message: 'amount는 숫자여야 합니다.' })
  amount: number;
}
