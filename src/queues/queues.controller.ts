import { Body, Controller, Post } from '@nestjs/common';

enum TokenStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  EXPIRE = 'expire',
}

@Controller('queues')
export class QueuesController {
  @Post()
  addToQueue(@Body('userId') userId: string) {
    const mockResponse = {
      statusCode: '200',
      message: 'success',
      data: {
        queueId: 123456789,
        status: TokenStatus.PENDING,
        position: 100,
        estimatedWaitTime: 30, // 30분 대기 예상 시간
      },
    };

    return mockResponse;
  }
}
