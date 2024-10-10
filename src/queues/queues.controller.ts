import { Body, Controller, Get, Post, Query, Headers } from '@nestjs/common';

enum TokenStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  EXPIRE = 'expire',
}

@Controller('queues')
export class QueuesController {
  @Get()
  checkQueueStatus(
    @Query('userId') userId: string,
    @Headers('WAITING_TOKEN') waitingToken: string,
  ) {
    return {
      statusCode: '200',
      message: 'success',
      data: {
        queueId: 123456789,
        status: TokenStatus.PENDING,
        position: 5,
        estimatedWaitTime: 15, // 분 단위
      },
    };
  }

  @Post()
  addToQueue(@Body('userId') userId: string) {
    return {
      statusCode: '200',
      message: 'success',
      data: {
        queueId: 123456789,
        status: TokenStatus.PENDING,
        position: 100,
        estimatedWaitTime: 30, // 30분 대기 예상 시간
      },
    };
  }
}
