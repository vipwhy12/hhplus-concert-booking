import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WatingQueueStatus } from './enum/waiting.queue.status';
import {
  WaitingQueuesRepository,
  WaitingQueuesRepositoryToken,
} from './waiting.queue.repositoty';

@Injectable()
export class WaitingQueuesService {
  constructor(
    @Inject(WaitingQueuesRepositoryToken)
    private readonly waitingQueuesRepository: WaitingQueuesRepository,
  ) {}

  // 토큰 ID를 받아 대기열을 가져오는 메서드
  async getWaitingQueueById(tokenId: number) {
    const result =
      await this.waitingQueuesRepository.getWaitingQueueById(tokenId);

    // 상태에 따른 로직 처리
    if (!result.status) {
      throw new Error('Status is missing');
    }

    if (result.status === WatingQueueStatus.EXPIRED) {
      throw new Error('Queue is expired');
    }

    if (result.status === WatingQueueStatus.ACTIVE) {
      return result;
    }

    if (result.status === WatingQueueStatus.WAITING) {
      const position = await this.waitingQueuesRepository.getPositionInQueue(
        result.id,
      );
      return { ...result, position };
    }
  }

  // 대기열에 추가하는 메서드
  async addToWaitingQueue() {
    const expireAt = new Date(new Date().getTime() + 30 * 60000);

    return await this.waitingQueuesRepository.addToWaitingQueue(expireAt);
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

  // 대기열을 활성화하는 메서드
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
