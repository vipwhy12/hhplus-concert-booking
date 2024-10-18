import { Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiAddToWaitingQueue,
  ApiGetWaitingQueue,
} from 'src/common/swagger/custom-api';
import { WaitingQueuesService } from 'src/domain/waiting-queue/waiting.queue.service';

@ApiTags('Waiting Queues')
@Controller('waiting-queues')
export class WaitingQueuesController {
  constructor(private readonly waitingQueuesService: WaitingQueuesService) {}

  @Get()
  @ApiGetWaitingQueue()
  async waitingQueue(@Headers('waiting-queues') uuid: string) {
    const waitingQueueId = parseInt(uuid, 10);

    return await this.waitingQueuesService.getWaitingQueueById(waitingQueueId);
  }

  @Post()
  @ApiAddToWaitingQueue()
  async addToWaitingQueue() {
    return await this.waitingQueuesService.addToWaitingQueue();
  }
}
