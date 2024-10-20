import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';

export const WaitingQueuesRepositoryToken = Symbol('WaitingQueuesRepository');
export interface WaitingQueuesRepository {
  //TODO: 반환값 선언하기

  //🪢 대기열 조회
  getWaitingQueues();

  //🪢 아이디로 대기열 조회
  getWaitingQueueById(tokenId: number);

  //🪢 대기열 등록
  addToWaitingQueue(expireAt: Date);

  //🪢 대기열 만료 상태 확인
  findExpiredQueues(now: Date);

  //🪢 대기열 상태 업데이트
  updateStatus(id: number, status: WatingQueueStatus);

  //🪢 대기열 위치 조회
  getPositionInQueue(id: number);
}
