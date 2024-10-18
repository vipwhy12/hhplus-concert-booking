import { Controller, Get, Post, Headers } from '@nestjs/common';
import { WaitingQueuesService } from 'src/domain/waiting-queue/waiting.queue.service';

@Controller('waiting-queues')
export class WaitingQueuesController {
  constructor(private readonly waitingQueuesService: WaitingQueuesService) {}

  @Get()
  async waitingQueue(@Headers('waiting-queues') uuid: string) {
    const waitingQueueId = parseInt(uuid, 10);

    return await this.waitingQueuesService.getWaitingQueueById(waitingQueueId);
  }

  @Post()
  //💥 회원이라면 회원을 넣어줘야 하지 않을까?
  async addToWaitingQueue() {
    return await this.waitingQueuesService.addToWaitingQueue();
  }
}
