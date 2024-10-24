import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from 'src/common/entity/reservation.entity';
import { SeatEntity } from 'src/common/entity/seat.entity';
import { SessionEntity } from 'src/common/entity/session.entity';
import { ReservationStatus } from 'src/common/enums/reserve.status';
import { SeatStatus } from 'src/common/enums/seat.status';
import {
  SeatNotAvailableException,
  SessionNotFoundException,
} from 'src/common/exception/session.exception';
import { ConcertRepository } from 'src/domain/concerts/concerts.repository';
import { ConcertMapper } from 'src/domain/concerts/mapper/concert.mapper';
import { Concert } from 'src/domain/concerts/model/concert';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ConcertRepositoryImple implements ConcertRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async getAvailableSessions(concertId: number): Promise<Concert[]> {
    const availableSessions = await this.sessionRepository.find({
      where: { concertId },
    });

    if (!availableSessions.length) {
      throw new SessionNotFoundException();
    }

    return ConcertMapper.toDomainList(availableSessions);
  }

  async getAvailableSeats(sessionId: number): Promise<SeatEntity[]> {
    const availableSeats = await this.seatRepository.find({
      where: {
        sessionId: sessionId,
        status: SeatStatus.AVAILABLE, // 좌석 상태가 예약 가능한 것만 필터링
      },
    });

    if (!availableSeats.length) {
      throw new SeatNotAvailableException();
    }

    return availableSeats;
  }

  async isReservableSeat(
    sessionId: number,
    seatId: number,
    manager: EntityManager,
  ): Promise<boolean> {
    const repository = manager
      ? manager.getRepository(SeatEntity)
      : this.seatRepository;

    const seat = await repository.findOne({
      where: {
        id: seatId,
        sessionId: sessionId,
        status: SeatStatus.AVAILABLE,
      },
    });

    if (!seat) {
      throw new SeatNotAvailableException();
    }

    return true;
  }

  async updateSeatStatus(
    sessionId: number,
    seatId: number,
    manager: EntityManager,
  ): Promise<void> {
    const repository = manager
      ? manager.getRepository(SeatEntity)
      : this.seatRepository;

    const result = await repository.update(
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
    manager?: EntityManager,
  ): Promise<ReservationEntity> {
    const repository = manager
      ? manager.getRepository(ReservationEntity)
      : this.reservationRepository;

    return await repository.save({
      concertSessionId: sessionId,
      seatId: seatId,
      userId: userId,
      status: ReservationStatus.PENDING,
    });
  }

  async getSessionById(id: number) {
    const session = await this.sessionRepository.findOne({ where: { id } });

    if (!session) {
      throw new SessionNotFoundException();
    }

    return session;
  }

  async getReservationById(id: number, manager?: EntityManager) {
    const repository = manager
      ? manager.getRepository(ReservationEntity)
      : this.reservationRepository;

    const reservation = await repository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new Error('Reservation not found');
    }
  }
}
