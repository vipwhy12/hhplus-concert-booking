import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ReservationsService } from '../reservation.service';
import {
  ReservationsRepository,
  ReservationsRepositoryToken,
} from '../reservation.repository';

describe('ReservationsService', () => {
  let reservationsService: ReservationsService;
  let reservationsRepository: DeepMocked<ReservationsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: ReservationsRepositoryToken,
          useFactory: () => createMock<ReservationsRepository>(),
        },
      ],
    }).compile();

    reservationsService = module.get<ReservationsService>(ReservationsService);
    reservationsRepository = module.get(ReservationsRepositoryToken);
  });

  describe('서비스가 정의되어있으면', () => {
    it('성공한다.', () => {
      expect(reservationsService).toBeDefined();
    });
  });

  // describe('getAvailableSessions', () => {
  //   describe('좌석 예약 단위', () => {});
  // });

  describe('getAvailableSessions', () => {
    it('유효한 콘서트 ID와 날짜로 세션을 조회한다.', async () => {
      const mockSessions = [{ sessionId: 1 }, { sessionId: 2 }];
      reservationsRepository.getAvailableSessions.mockResolvedValue(
        mockSessions,
      );

      const result = await reservationsService.getAvailableSessions(
        1,
        new Date(),
      );
      expect(result).toEqual(mockSessions);
    });
  });

  describe('getAvailableSeats', () => {
    it('세션 ID로 이용 가능한 좌석을 조회한다.', async () => {
      const mockSeats = [{ seatId: 1 }, { seatId: 2 }];
      reservationsRepository.getAvailableSeats.mockResolvedValue(mockSeats);

      const result = await reservationsService.getAvailableSeats(1);
      expect(result).toEqual(mockSeats);
    });
  });

  describe('isReservableSeat', () => {
    it('예약 가능한 좌석인지 확인한다.', async () => {
      reservationsRepository.isReservableSeat.mockResolvedValue(true);

      const result = await reservationsService.isReservableSeat(1, 1);
      expect(result).toBe(true);
    });

    it('예약 불가능한 좌석이면 에러를 던진다.', async () => {
      reservationsRepository.isReservableSeat.mockResolvedValue(false);

      await expect(reservationsService.isReservableSeat(1, 1)).rejects.toThrow(
        'Seat is not reservable',
      );
    });
  });

  describe('saveReservationInfo', () => {
    it('예약 정보를 저장한다.', async () => {
      const mockReservation = { id: 1 };
      reservationsRepository.saveReservationInfo.mockResolvedValue(
        mockReservation,
      );

      const result = await reservationsService.saveReservationInfo(1, 1, 1);
      expect(result).toEqual(mockReservation);
    });
  });

  describe('updateSeatStatus', () => {
    it('좌석 상태를 업데이트한다.', async () => {
      reservationsRepository.updateSeatStatus.mockResolvedValue(undefined);

      await reservationsService.updateSeatStatus(1, 1);
      expect(reservationsRepository.updateSeatStatus).toHaveBeenCalledWith(
        1,
        1,
      );
    });
  });
});
