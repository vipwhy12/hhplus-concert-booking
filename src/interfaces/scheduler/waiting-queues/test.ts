import { Cron, CronExpression } from '@nestjs/schedule';
import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';
import { WaitingQueuesRepository } from 'src/domain/waiting-queue/waiting.queue.repositoty';

export class WaitingQueuesScheduler {
  constructor(
    private readonly waitingQueuesRepository: WaitingQueuesRepository,
  ) {}

  // TODO: 대기열을 활성화하는 메서드
  // 계층형 레이어드 에서 어떤 계층일까? 호출 되는 메서드는 모두 어떤 계층에 속해야 할까요
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

  // 대기열에서 삭제하는 메서드
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
}
