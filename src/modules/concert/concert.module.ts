// import { AuthRepositoryToken } from 'src/domain/auth/auth.repository';
// import { AuthRepositoryImpl } from 'src/infrastructure/auth/auth.repository.impl';
// import { AuthService } from 'src/domain/auth/auth.service';
// import { ConcertsFacade } from 'src/application/concerts/concerts.facade';
// import { ReservationRepositoryImpl } from 'src/infrastructure/reservations/reservation.repository.impl';
// import { ReservationsRepositoryToken } from 'src/domain/reservations/reservation.repository';
// import { ReservationsService } from 'src/domain/reservations/reservation.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from 'src/infrastructure/auth/entity/user.entity';
// import { Module } from '@nestjs/common';
// import { SessionEntity } from 'src/common/entity/session.entity';
// import { SeatEntity } from 'src/common/entity/seat.entity';
// import { ReservationEntity } from 'src/common/entity/reservation.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       SessionEntity,
//       SeatEntity,
//       ReservationEntity,
//       UserEntity,
//     ]),
//   ],
//   controllers: [ConcertsController],
//   providers: [
//     ConcertsFacade,
//     ReservationsService,
//     AuthService,
//     {
//       provide: ReservationsRepositoryToken,
//       useClass: ReservationRepositoryImpl,
//     },
//     {
//       provide: AuthRepositoryToken,
//       useClass: AuthRepositoryImpl,
//     },
//   ],
// })
// export class ConcertModule {}
