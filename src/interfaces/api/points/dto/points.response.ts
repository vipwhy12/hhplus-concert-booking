import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dtos/response.dto';

export class PointResponseDto extends ResponseDto<{
  userId: number;
  amount: number;
}> {
  constructor(userId: number, amount: number) {
    super({ userId, amount });
  }

  @ApiProperty({ description: '유저 ID', example: 1 })
  userId: number;

  @ApiProperty({ description: '포인트 양', example: 1000 })
  amount: number;
}
