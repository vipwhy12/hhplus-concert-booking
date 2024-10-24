import { AuthRepositoryToken } from 'src/domain/auth/auth.repository';
import { AuthRepositoryImpl } from 'src/infrastructure/auth/auth.repository.impl';
import { AuthService } from 'src/domain/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/auth/entity/user.entity';
import { Module } from '@nestjs/common';
import { SessionEntity } from 'src/common/entity/session.entity';
import { SeatEntity } from 'src/common/entity/seat.entity';
import { ReservationEntity } from 'src/common/entity/reservation.entity';
import { ConcertsFacade } from 'src/application/concerts/concerts.facade';
import { ConcertsController } from 'src/interfaces/api/concerts/concerts.controller';
import { ConcertsService } from 'src/domain/concerts/concerts.service';
import { ConcertRepositoryToken } from 'src/domain/concerts/concerts.repository';
import { ConcertRepositoryImple } from 'src/infrastructure/concerts/concerts.repository.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SessionEntity,
      SeatEntity,
      ReservationEntity,
      UserEntity,
    ]),
  ],
  controllers: [ConcertsController],
  providers: [
    ConcertsFacade,
    ConcertsService,
    AuthService,
    {
      provide: ConcertRepositoryToken,
      useClass: ConcertRepositoryImple,
    },
    {
      provide: AuthRepositoryToken,
      useClass: AuthRepositoryImpl,
    },
  ],
})
export class ConcertModule {}
