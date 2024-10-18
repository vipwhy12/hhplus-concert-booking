import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertsFacade } from 'src/application/concerts/concerts.facade';
import { ReservationEntity } from 'src/common/entities/reservation.entity';
import { SeatEntity } from 'src/common/entities/seat.entity';
import { SessionEntity } from 'src/common/entities/session.entity';
import { ReservationsRepositoryToken } from 'src/domain/reservations/reservation.repository';
import { ReservationsService } from 'src/domain/reservations/reservation.service';
import { ReservationRepositoryImpl } from 'src/infrastructure/reservations/reservation.repository.impl';
import { ConcertsController } from 'src/interfaces/api/concerts';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity, SeatEntity, ReservationEntity]),
  ],
  controllers: [ConcertsController],
  providers: [
    ConcertsFacade,
    ReservationsService,
    {
      provide: ReservationsRepositoryToken,
      useClass: ReservationRepositoryImpl,
    },
  ],
})
export class ConcertsModule {}
