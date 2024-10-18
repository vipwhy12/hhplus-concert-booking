import { Inject, Injectable } from '@nestjs/common';
import {
  ReservationsRepository,
  ReservationsRepositoryToken,
} from './reservation.repository';

@Injectable()
export class ReservationsService {
  getReservationById(reservationId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(ReservationsRepositoryToken)
    private readonly reservationRepository: ReservationsRepository,
  ) {}

  //1. 날짜에 맞는 콘서트 좌석 확인하기
  async getAvailableSessions(concertId: number, date: Date) {
    return await this.reservationRepository.getAvailableSessions(
      concertId,
      date,
    );
  }

  //2. 세션에 맞는 좌석 반환 받기
  async getAvailableSeats(sessionId: number) {
    return await this.reservationRepository.getAvailableSeats(sessionId);
  }

  //3. 세션 아이디에 맞는 정보 반환 받기
  async getSessionById(sessionId: number) {
    return await this.reservationRepository.getSessionById(sessionId);
  }

  //TODO: 에러처리
  async isReservableSeat(sessionId: number, seatId: number) {
    return await this.reservationRepository.isReservableSeat(sessionId, seatId);
  }

  async saveReservationInfo(sessionId: number, seatId: number, userId: number) {
    return await this.reservationRepository.saveReservationInfo(
      sessionId,
      seatId,
      userId,
    );
  }

  async updateSeatStatus(sessionId: number, seatId: number) {
    return await this.reservationRepository.updateSeatStatus(sessionId, seatId);
  }
}
