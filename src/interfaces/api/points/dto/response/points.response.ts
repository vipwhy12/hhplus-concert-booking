import { ResponseDto } from 'src/common/dto/response.dto';

export class PointResponseDto extends ResponseDto<{
  userId: number;
  amount: number;
}> {
  constructor(userId: number, amount: number) {
    super({ userId, amount });
  }
}
