import { EntityManager } from 'typeorm';
import { Concert } from './model/concert';

export const ConcertRepositoryToken = Symbol('ConcertRepositoryToken');
export interface ConcertRepository {
  //예약 가능한 세션 조회
  getAvailableSessions(concertId: number): Promise<Concert[]>;

  //아이디로 세션을 조회
  getSessionById(sessionId: number);

  saveReservationInfo(
    sessionId: number,
    seatId: number,
    userId: number,
    manager?: EntityManager,
  );

  updateSeatStatus(sessionId: number, seatId: number, manager?: EntityManager);

  //예약 가능한 좌석 조회
  isReservableSeat(
    sessionId: number,
    seatId: number,
    manager?: EntityManager,
  ): Promise<boolean>;

  getAvailableSeats(sessionId: number);

  getReservationById(id: number, manager?: EntityManager);
}
