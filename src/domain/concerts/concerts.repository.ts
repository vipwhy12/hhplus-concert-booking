import { Concert } from './model/concert';

export const ConcertRepositoryToken = Symbol('ConcertRepositoryToken');
export interface ConcertRepository {
  //예약 가능한 세션 조회
  getAvailableSessions(concertId: number): Promise<Concert[]>;

  //아이디로 세션을 조회
  getSessionById(sessionId: number);

  saveReservationInfo(sessionId: number, seatId: number, userId: number);

  updateSeatStatus(sessionId: number, seatId: number);

  //예약 가능한 좌석 조회
  isReservableSeat(sessionId: number, seatId: number): Promise<boolean>;

  getAvailableSeats(sessionId: number);
}
