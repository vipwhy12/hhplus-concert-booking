import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';
import { WaitingQueuesRepository } from 'src/domain/waiting-queue/waiting.queue.repositoty';

@Injectable()
export class WaitingQueueScheduler {
  constructor(
    private readonly waitingQueuesRepository: WaitingQueuesRepository,
  ) {}

  //TODO: 리팩토링 필요
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

    //TODO: 대기열 활성화 시, 콘서트 별로 할 수 있도록 수정

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
