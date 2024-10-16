import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { PaymentsService } from '../payments.service';
import {
  PaymentRepositoryToken,
  PaymentsRepository,
} from '../payments.repository';

describe('PaymentsService', () => {
  let paymentsService: PaymentsService;
  let paymentsRepository: DeepMocked<PaymentsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: PaymentRepositoryToken,
          useFactory: () => createMock<PaymentsRepository>(),
        },
      ],
    }).compile();

    paymentsService = module.get<PaymentsService>(PaymentsService);
    paymentsRepository = module.get(PaymentRepositoryToken);
  });

  describe('서비스가 정의되어있으면', () => {
    it('성공한다.', () => {
      expect(paymentsService).toBeDefined();
    });
  });

  describe('포인트 조회 시,', () => {
    describe('매개변수가 유효하다면', () => {
      const validUserId = 1;
      const expectResult = { userId: 1, amount: 1000 };

      it('성공한다.', async () => {
        paymentsRepository.getUserPoint.mockResolvedValue(expectResult);

        const result = paymentsService.point(validUserId);

        await expect(result).resolves.toBe(expectResult);
      });
    });
  });

  describe('포인트 충전 시,', () => {
    describe('충전 포인트가 0보다 작으면', () => {
      const invalidAmount = -1;
      it('실패한다.', () => {
        expect(() => paymentsService.chargePoint(1, invalidAmount)).toThrow(
          '충전 금액은 0보다 커야 합니다.',
        );
      });
    });
  });

  describe('충전 포인트가 0보다 크면', () => {
    const validUserId = 1;
    const vaildAmout = 1000;
    const getUserPointResult = { userId: 1, amount: 1000 };
    const expectResult = { userId: 1, amount: 2000 };

    it('성공한다.', async () => {
      paymentsRepository.getUserPoint.mockResolvedValue(getUserPointResult);
      paymentsRepository.updatePoint.mockResolvedValue(true);

      const result = paymentsService.chargePoint(validUserId, vaildAmout);

      await expect(result).resolves.toStrictEqual(expectResult);
    });
  });
});
