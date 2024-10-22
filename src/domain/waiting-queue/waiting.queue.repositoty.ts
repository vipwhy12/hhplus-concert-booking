import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';
import { WaitingQueue } from './model/waiting.queue';

export const WaitingQueuesRepositoryToken = Symbol('WaitingQueuesRepository');
export interface WaitingQueuesRepository {
  //🪢 대기열 조회
  getWaitingQueues();

  //🪢 아이디로 대기열 조회
  getWaitingQueueById(tokenId: number): Promise<WaitingQueue>;

  //🪢 대기열 등록
  addToWaitingQueue(expireAt: Date): Promise<WaitingQueue>;

  //🪢 대기열 만료 상태 확인
  findExpiredQueues(now: Date);

  //🪢 대기열 상태 업데이트
  updateStatus(id: number, status: WatingQueueStatus);

  //🪢 대기열 위치 조회
  getPositionInQueue(id: number);
}
