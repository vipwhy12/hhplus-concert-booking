import { Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WaitingQueuesService } from 'src/domain/waiting-queue/waiting.queue.service';
import { WaitingQueueResDto } from './dto/waiting.queue.res.dto';
import {
  ApiAddToWaitingQueue,
  ApiGetWaitingQueue,
} from 'src/common/docs/waiting.queue.document';

@ApiTags('Waiting Queues')
@Controller('waiting-queues')
export class WaitingQueuesController {
  constructor(private readonly waitingQueuesService: WaitingQueuesService) {}

  @Get()
  @ApiGetWaitingQueue()
  async waitingQueue(
    @Headers('waiting-queues') uuid: string,
  ): Promise<WaitingQueueResDto> {
    const waitingQueueId = parseInt(uuid, 10);

    return await this.waitingQueuesService.getWaitingQueueById(waitingQueueId);
  }

  @Post()
  @ApiAddToWaitingQueue()
  async addToWaitingQueue(): Promise<WaitingQueueResDto> {
    return await this.waitingQueuesService.addToWaitingQueue();
  }
}
