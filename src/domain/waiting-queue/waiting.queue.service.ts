import { Inject, Injectable } from '@nestjs/common';
import { WaitingQueue } from './model/waiting.queue';
import { WaitingQueueMapper } from './mapper/waiting.queue.mapper';
import { WaitingQueueResDto } from 'src/interfaces/api/waiting-queues/dto/waiting.queue.res.dto';
import {
  WaitingQueuesRepository,
  WaitingQueuesRepositoryToken,
} from './waiting.queue.repositoty';
import { WaitingQueueExpiredException } from 'src/common/exception/waiting.queue.expired.exception';

@Injectable()
export class WaitingQueuesService {
  private readonly WAITING_GROUP_SIZE = 50;
  private readonly WAITING_TIME_PER_GROUP = 5;

  constructor(
    @Inject(WaitingQueuesRepositoryToken)
    private readonly waitingQueuesRepository: WaitingQueuesRepository,
  ) {}

  //대기번호 조회
  async getWaitingQueueById(id: number): Promise<WaitingQueueResDto> {
    try {
      const queue = await this.waitingQueuesRepository.getWaitingQueueById(id);

      if (WaitingQueue.isExpired(queue))
        throw new WaitingQueueExpiredException();

      if (WaitingQueue.isWaiting(queue)) {
        await this.updateQueueWithPositionAndTime(queue, id);
      }

      return WaitingQueueMapper.toRes(queue);
    } catch (error) {
      console.error(error);
    }
  }

  // Queue에 대기 순번 및 예상 대기 시간을 업데이트
  private async updateQueueWithPositionAndTime(
    queue: WaitingQueue,
    tokenId: number,
  ) {
    const position = await this.getMyPosition(tokenId);
    const estimatedWaitTime = this.getMyWaitingTime(position);

    queue.position = position;
    queue.estimatedWaitTime = estimatedWaitTime;
  }

  //토큰 발급
  async addToWaitingQueue(): Promise<WaitingQueueResDto> {
    const expireAt = new Date(new Date().getTime() + 30 * 60000);
    const waitingQueue =
      await this.waitingQueuesRepository.addToWaitingQueue(expireAt);
    return WaitingQueueMapper.toRes(waitingQueue);
  }

  //내 대기 시간 구하기
  getMyWaitingTime(myTurn: number): number {
    return (
      Math.ceil(myTurn / this.WAITING_GROUP_SIZE) * this.WAITING_TIME_PER_GROUP
    );
  }

  //내 대기 번호 구하기
  async getMyPosition(id: number): Promise<number> {
    return this.waitingQueuesRepository.getPositionInQueue(id);
  }
}
