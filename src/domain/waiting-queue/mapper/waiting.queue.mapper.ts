import { WaitingQueueResDto } from 'src/interfaces/api/waiting-queues/dto/waiting.queue.res.dto';
import { WaitingQueue } from '../model/waiting.queue';

export class WaitingQueueMapper {
  static toDomain(waitingQueue: WaitingQueue): WaitingQueue {
    const { id, expireAt, status } = waitingQueue;
    return new WaitingQueue(id, expireAt, status);
  }

  static toRes(waitingQueue: WaitingQueue): WaitingQueueResDto {
    const { id, status, position, estimatedWaitTime } = waitingQueue;

    return new WaitingQueueResDto(id, status, position, estimatedWaitTime);
  }
}
