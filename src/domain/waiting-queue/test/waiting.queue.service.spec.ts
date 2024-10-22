import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { WaitingQueuesService } from '../waiting.queue.service';
import {
  WaitingQueuesRepository,
  WaitingQueuesRepositoryToken,
} from '../waiting.queue.repositoty';
import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';
import { BadRequestException } from '@nestjs/common';
import { WaitingQueueMapper } from '../mapper/waiting.queue.mapper';
import { WaitingQueue } from '../model/waiting.queue';

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
    it('대기열이 만료되었으면 에러를 던진다.', async () => {
      const mockQueue: WaitingQueue = {
        id: 1,
        expireAt: new Date(),
        status: WatingQueueStatus.EXPIRED,
      };
      waitingQueuesRepository.getWaitingQueueById.mockResolvedValue(mockQueue);

      await expect(waitingQueuesService.getWaitingQueueById(1)).rejects.toThrow(
        new BadRequestException('Queue is expired'),
      );
    });

    it('대기열이 활성화 상태이면 대기열을 반환한다.', async () => {
      const mockQueue: WaitingQueue = {
        id: 1,
        expireAt: new Date(),
        status: WatingQueueStatus.ACTIVE,
      };
      waitingQueuesRepository.getWaitingQueueById.mockResolvedValue(mockQueue);

      const result = await waitingQueuesService.getWaitingQueueById(1);
      expect(result).toEqual(WaitingQueueMapper.toRes(mockQueue));
    });

    it('대기열이 대기 중이면 위치와 예상 대기 시간을 반환한다.', async () => {
      const mockQueue: WaitingQueue = {
        id: 1,
        expireAt: new Date(),
        status: WatingQueueStatus.WAITING,
      };
      const mockPosition = 2;
      const mockWaitTime = 10;

      waitingQueuesRepository.getWaitingQueueById.mockResolvedValue(mockQueue);
      waitingQueuesRepository.getPositionInQueue.mockResolvedValue(
        mockPosition,
      );
      jest
        .spyOn(waitingQueuesService, 'getMyWaitingTime')
        .mockReturnValue(mockWaitTime);

      const result = await waitingQueuesService.getWaitingQueueById(1);

      expect(result).toEqual({
        ...WaitingQueueMapper.toRes(mockQueue),
        position: mockPosition,
        estimatedWaitTime: mockWaitTime,
      });
    });
  });

  describe('addToWaitingQueue', () => {
    it('대기열에 정상적으로 추가되면 성공한다.', async () => {
      const mockResult: WaitingQueue = {
        id: 1,
        expireAt: new Date(),
        status: WatingQueueStatus.WAITING,
      };
      waitingQueuesRepository.addToWaitingQueue.mockResolvedValue(mockResult);

      const result = await waitingQueuesService.addToWaitingQueue();
      expect(result).toEqual(WaitingQueueMapper.toRes(mockResult));
    });
  });

  describe('getMyWaitingTime', () => {
    it('내 대기 시간을 올바르게 계산한다.', () => {
      const myTurn = 75;
      const expectedWaitTime = 10; // 75번째 -> 2 그룹(50명 단위) -> 10분

      const result = waitingQueuesService.getMyWaitingTime(myTurn);
      expect(result).toBe(expectedWaitTime);
    });
  });

  describe('getMyPosition', () => {
    it('내 대기 번호를 반환한다.', async () => {
      const mockPosition = 2;
      waitingQueuesRepository.getPositionInQueue.mockResolvedValue(
        mockPosition,
      );

      const result = await waitingQueuesService.getMyPosition(1);
      expect(result).toBe(mockPosition);
    });
  });
});
