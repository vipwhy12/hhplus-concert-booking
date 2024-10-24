import { Inject, Injectable } from '@nestjs/common';
import {
  ConcertRepository,
  ConcertRepositoryToken,
} from './concerts.repository';

@Injectable()
export class ConcertsService {
  constructor(
    @Inject(ConcertRepositoryToken)
    private readonly concertRepository: ConcertRepository,
  ) {}

  //TODO: 1. 특정 콘서트의 예약 가능한 날짜 조회
  async getAvailableSessions(id: number) {
    return await this.concertRepository.getAvailableSessions(id);
  }

  //TODO: 2. 예약 가능한 콘서트의 좌석 정보조회
  async getAvailableSeats(sessionId: number) {
    return await this.concertRepository.getAvailableSeats(sessionId);
  }

  //3. 세션 아이디에 맞는 정보 반환 받기
  async getSessionById(sessionId: number) {
    return await this.concertRepository.getSessionById(sessionId);
  }

  async isReservableSeat(sessionId: number, seatId: number): Promise<boolean> {
    return await this.concertRepository.isReservableSeat(sessionId, seatId);
  }

  async saveReservationInfo(sessionId: number, seatId: number, userId: number) {
    return await this.concertRepository.saveReservationInfo(
      sessionId,
      seatId,
      userId,
    );
  }

  async updateSeatStatus(sessionId: number, seatId: number) {
    return await this.concertRepository.updateSeatStatus(sessionId, seatId);
  }

  getReservationById(reservationId: number) {
    throw new Error('Method not implemented.');
  }
}
