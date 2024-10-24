import { Inject, Injectable } from '@nestjs/common';
import {
  ConcertRepository,
  ConcertRepositoryToken,
} from './concerts.repository';
import { Concert } from './model/concert';
import { SeatEntity } from 'src/common/entity/seat.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class ConcertsService {
  constructor(
    @Inject(ConcertRepositoryToken)
    private readonly concertRepository: ConcertRepository,
  ) {}

  async getAvailableSessions(id: number): Promise<Concert[]> {
    return await this.concertRepository.getAvailableSessions(id);
  }

  async getAvailableSeats(sessionId: number): Promise<SeatEntity[]> {
    return await this.concertRepository.getAvailableSeats(sessionId);
  }

  async getSessionById(sessionId: number) {
    return await this.concertRepository.getSessionById(sessionId);
  }

  async isReservableSeat(
    sessionId: number,
    seatId: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    const isReservableSeat = manager
      ? await this.concertRepository.isReservableSeat(seatId, seatId, manager)
      : await this.concertRepository.isReservableSeat(sessionId, seatId);

    return isReservableSeat;
  }

  async saveReservationInfo(
    sessionId: number,
    seatId: number,
    userId: number,
    manager?: EntityManager,
  ) {
    return manager
      ? await this.concertRepository.saveReservationInfo(
          sessionId,
          seatId,
          userId,
          manager,
        )
      : await this.concertRepository.saveReservationInfo(
          sessionId,
          seatId,
          userId,
        );
  }

  async updateSeatStatus(
    sessionId: number,
    seatId: number,
    manager?: EntityManager,
  ): Promise<void> {
    await (manager
      ? this.concertRepository.updateSeatStatus(sessionId, seatId, manager)
      : this.concertRepository.updateSeatStatus(sessionId, seatId));
  }

  async getReservationById(reservationId: number, manager?: EntityManager) {
    return (await manager)
      ? this.concertRepository.getReservationById(reservationId, manager)
      : this.concertRepository.getReservationById(reservationId);
  }
}
