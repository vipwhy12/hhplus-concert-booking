import { Inject, Injectable } from '@nestjs/common';
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

    // // 상태에 따른 로직 처리
    // if (!result.status) {
    //   throw new Error('Status is missing');
    // }

    // if (result.status === WatingQueueStatus.EXPIRED) {
    //   throw new Error('Queue is expired');
    // }

    // if (result.status === WatingQueueStatus.ACTIVE) {
    //   return result;
    // }

    // if (result.status === WatingQueueStatus.WAITING) {
    //   const position = await this.waitingQueuesRepository.getPositionInQueue(
    //     result.id,
    //   );
    // return { ...result, position };
  }
}

// 대기열에 추가하는 메서드
// async addToWaitingQueue() {
//   const expireAt = new Date(new Date().getTime() + 30 * 60000);

//   return await this.waitingQueuesRepository.addToWaitingQueue(expireAt);
// }
// }
