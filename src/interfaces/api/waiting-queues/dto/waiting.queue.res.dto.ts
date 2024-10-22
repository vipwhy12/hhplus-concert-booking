import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';

export class WaitingQueueResDto extends ResponseDto<{
  id: number;
  status: WatingQueueStatus;
  position: number;
  estimatedWaitTime: number;
}> {
  constructor(
    id: number,
    status: WatingQueueStatus,
    position: number,
    estimatedWaitTime: number,
  ) {
    super({ id, status, position, estimatedWaitTime });
  }

  @ApiProperty({ description: '대기열 ID', example: 1 })
  queueId: number;

  @ApiProperty({ description: '토큰 상태', example: 1000 })
  status: WatingQueueStatus;

  @ApiProperty({ description: '대기열의 위치', example: 1000 })
  position: number;

  @ApiProperty({ description: '예상 대기 시간(분)', example: 1000 })
  estimatedWaitTime: number;
}
