import { WaitingQueuesRepositoryToken } from 'src/domain/waiting-queue/waiting.queue.repositoty';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { WaitingQueuesService } from '../waiting.queue.service';
import { WaitingQueuesRepository } from '../waiting.queue.repositoty';
import { WatingQueueStatus } from '../enum/waiting.queue.status';

describe('WaitingQueuesService', () => {
  let waitingQueuesService: WaitingQueuesService;
  let waitingQueuesRepository: DeepMocked<WaitingQueuesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaitingQueuesService,
        {
          provide: WaitingQueuesRepositoryToken,
          useFactory: () => createMock<WaitingQueuesRepository>(),
        },
      ],
    }).compile();

    waitingQueuesService =
      module.get<WaitingQueuesService>(WaitingQueuesService);
    waitingQueuesRepository = module.get(WaitingQueuesRepositoryToken);
  });

  describe('서비스가 정의되어있으면', () => {
    it('성공한다.', () => {
      expect(waitingQueuesService).toBeDefined();
    });
  });

  describe('getWaitingQueueById', () => {
    it('대기열 상태가 없으면 에러를 던진다.', async () => {
      waitingQueuesRepository.getWaitingQueueById.mockResolvedValue({
        status: null,
      });

      await expect(waitingQueuesService.getWaitingQueueById(1)).rejects.toThrow(
        'Status is missing',
      );
    });

    it('대기열이 만료되었으면 에러를 던진다.', async () => {
      waitingQueuesRepository.getWaitingQueueById.mockResolvedValue({
        status: WatingQueueStatus.EXPIRED,
      });

      await expect(waitingQueuesService.getWaitingQueueById(1)).rejects.toThrow(
        'Queue is expired',
      );
    });

    it('대기열이 활성화 상태이면 대기열을 반환한다.', async () => {
      const mockQueue = { status: WatingQueueStatus.ACTIVE };
      waitingQueuesRepository.getWaitingQueueById.mockResolvedValue(mockQueue);

      const result = await waitingQueuesService.getWaitingQueueById(1);
      expect(result).toEqual(mockQueue);
    });

    it('대기열이 대기 중이면 위치를 반환한다.', async () => {
      const mockQueue = { id: 1, status: WatingQueueStatus.WAITING };
      waitingQueuesRepository.getWaitingQueueById.mockResolvedValue(mockQueue);
      waitingQueuesRepository.getPositionInQueue.mockResolvedValue(2);

      const result = await waitingQueuesService.getWaitingQueueById(1);
      expect(result).toEqual({ ...mockQueue, position: 2 });
    });
  });

  describe('addToWaitingQueue', () => {
    it('대기열에 정상적으로 추가되면 성공한다.', async () => {
      const mockResult = { id: 1, expireAt: new Date() };
      waitingQueuesRepository.addToWaitingQueue.mockResolvedValue(mockResult);

      const result = await waitingQueuesService.addToWaitingQueue();
      expect(result).toEqual(mockResult);
    });
  });

  describe('updateExpiredStatuses', () => {
    it('만료된 대기열 상태를 업데이트한다.', async () => {
      const now = new Date();
      const expiredQueues = [{ id: 1 }, { id: 2 }];
      waitingQueuesRepository.findExpiredQueues.mockResolvedValue(
        expiredQueues,
      );

      await waitingQueuesService.updateExpiredStatuses();

      expect(waitingQueuesRepository.updateStatus).toHaveBeenCalledTimes(2);
      expect(waitingQueuesRepository.updateStatus).toHaveBeenCalledWith(
        1,
        WatingQueueStatus.EXPIRED,
      );
      expect(waitingQueuesRepository.updateStatus).toHaveBeenCalledWith(
        2,
        WatingQueueStatus.EXPIRED,
      );
    });
  });

  describe('activateWaitingQueues', () => {
    it('대기열이 없으면 로그를 출력하고 종료한다.', async () => {
      waitingQueuesRepository.getWaitingQueues.mockResolvedValue([]);

      const logSpy = jest.spyOn(console, 'log');

      await waitingQueuesService.activateWaitingQueues();

      expect(logSpy).toHaveBeenCalledWith('No waiting items to activate.');
    });

    it('대기열을 활성화하고 로그를 출력한다.', async () => {
      const waitingQueues = [{ id: 1 }, { id: 2 }];
      waitingQueuesRepository.getWaitingQueues.mockResolvedValue(waitingQueues);

      const logSpy = jest.spyOn(console, 'log');

      await waitingQueuesService.activateWaitingQueues();

      expect(waitingQueuesRepository.updateStatus).toHaveBeenCalledTimes(2);
      expect(waitingQueuesRepository.updateStatus).toHaveBeenCalledWith(
        1,
        WatingQueueStatus.ACTIVE,
      );
      expect(waitingQueuesRepository.updateStatus).toHaveBeenCalledWith(
        2,
        WatingQueueStatus.ACTIVE,
      );
      expect(logSpy).toHaveBeenCalledWith('Activated 2 waiting queues.');
    });
  });
});
