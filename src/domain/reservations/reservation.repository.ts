export const ReservationsRepositoryToken = Symbol('WaitingQueuesRepository');
export interface ReservationsRepository {
  getSessionById(sessionId: number);
  saveReservationInfo(sessionId: number, seatId: number, userId: number);
  updateSeatStatus(sessionId: number, seatId: number);
  isReservableSeat(sessionId: number, seatId: number);
  getAvailableSessions(concertId: number, date: Date);
  getAvailableSeats(sessionId: number);
}
