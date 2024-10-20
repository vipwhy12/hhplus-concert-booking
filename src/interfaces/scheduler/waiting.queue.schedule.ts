import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';
import { WaitingQueuesRepository } from 'src/domain/waiting-queue/waiting.queue.repositoty';

@Injectable()
export class WaitingQueueScheduler {
  constructor(
    private readonly waitingQueuesRepository: WaitingQueuesRepository,
  ) {}

  // 만료된 상태를 업데이트
  @Cron(CronExpression.EVERY_5_MINUTES)
  async updateExpiredStatuses() {
    const now = new Date();
    const expiredItems =
      await this.waitingQueuesRepository.findExpiredQueues(now);

    for (const item of expiredItems) {
      await this.waitingQueuesRepository.updateStatus(
        item.id,
        WatingQueueStatus.EXPIRED,
      );
    }
  }

  // 대기열을 활성화
  @Cron(CronExpression.EVERY_10_MINUTES)
  async activateWaitingQueues() {
    const waitingItems = await this.waitingQueuesRepository.getWaitingQueues();

    if (waitingItems.length === 0) {
      console.log('No waiting items to activate.');
      return;
    }

    for (const item of waitingItems) {
      await this.waitingQueuesRepository.updateStatus(
        item.id,
        WatingQueueStatus.ACTIVE,
      );
    }

    console.log(`Activated ${waitingItems.length} waiting queues.`);
  }
}
