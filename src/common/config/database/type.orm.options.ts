import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConcertEntity } from 'src/common/entity/concert.entity';
import { ReservationEntity } from 'src/common/entity/reservation.entity';
import { SeatEntity } from 'src/common/entity/seat.entity';
import { SessionEntity } from 'src/common/entity/session.entity';
import { UserEntity } from 'src/infrastructure/auth/entity/user.entity';
import { Point } from 'src/infrastructure/payments/entity/point.entity';
import { WaitingQueuesEntity } from 'src/infrastructure/waiting-queues/entity/waiting.queue.entity';

export const typeOrmOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  synchronize: true,
  logging: true,
  entities: [
    Point,
    UserEntity,
    WaitingQueuesEntity,
    ConcertEntity,
    SessionEntity,
    SeatEntity,
    ReservationEntity,
  ],
});
