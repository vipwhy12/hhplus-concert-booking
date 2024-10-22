import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';

export class WaitingQueue {
  constructor(
    public id: number,
    public expireAt: Date,
    public status: WatingQueueStatus,
    public position?: number,
    public estimatedWaitTime?: number,
  ) {}

  //TODO: 해당 로직이 여기 있는 것이 적절한가?
  static isExpired(waitingQueue: WaitingQueue) {
    return waitingQueue.status === WatingQueueStatus.EXPIRED;
  }

  static isActive(waitingQueue: WaitingQueue) {
    return waitingQueue.status === WatingQueueStatus.ACTIVE;
  }

  static isWaiting(waitingQueue: WaitingQueue) {
    return waitingQueue.status === WatingQueueStatus.WAITING;
  }
}
