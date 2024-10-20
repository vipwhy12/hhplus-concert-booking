import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from 'src/common/entity/reservation.entity';
import { SeatEntity } from 'src/common/entity/seat.entity';
import { SessionEntity } from 'src/common/entity/session.entity';
import { ReservationStatus } from 'src/common/enums/reserve.status';
import { SeatStatus } from 'src/common/enums/seat.status';
import { ReservationsRepository } from 'src/domain/reservations/reservation.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationRepositoryImpl implements ReservationsRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async getAvailableSessions(
    concertId: number,
    date: Date,
  ): Promise<SessionEntity[]> {
    const availableSessions = await this.sessionRepository.find({
      where: { concertId, date },
    });

    return availableSessions;
  }

  async getAvailableSeats(sessionId: number): Promise<SeatEntity[]> {
    const availableSeats = await this.seatRepository.find({
      where: {
        sessionId: sessionId,
        status: SeatStatus.AVAILABLE, // 좌석 상태가 예약 가능한 것만 필터링
      },
    });

    return availableSeats;
  }

  async isReservableSeat(sessionId: number, seatId: number): Promise<boolean> {
    const seat = await this.seatRepository.findOne({
      where: {
        id: seatId,
        sessionId: sessionId,
        status: SeatStatus.AVAILABLE, // 예약 가능한 좌석인지 확인
      },
    });

    return !!seat;
  }

  async updateSeatStatus(sessionId: number, seatId: number): Promise<void> {
    const result = await this.seatRepository.update(
      { id: seatId, sessionId: sessionId },
      { status: SeatStatus.RESERVED },
    );

    if (result.affected === 0) {
      throw new Error('Seat not found or already updated');
    }
  }

  async saveReservationInfo(
    sessionId: number,
    seatId: number,
    userId: number,
  ): Promise<ReservationEntity> {
    return await this.reservationRepository.save({
      concertSessionId: sessionId,
      seatId: seatId,
      userId: userId,
      status: ReservationStatus.PENDING,
    });
  }

  async getSessionById(id: number) {
    return await this.sessionRepository.findOne({ where: { id } });
  }
}
