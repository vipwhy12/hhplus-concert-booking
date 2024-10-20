import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConcertEntity } from 'src/common/entities/concert.entity';
import { ReservationEntity } from 'src/common/entities/reservation.entity';
import { SeatEntity } from 'src/common/entities/seat.entity';
import { SessionEntity } from 'src/common/entities/session.entity';
import { UserEntity } from 'src/common/entities/user.entity';
import { PointEntity } from 'src/infrastructure/payments/entity/point.entity';
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
    PointEntity,
    UserEntity,
    WaitingQueuesEntity,
    ConcertEntity,
    SessionEntity,
    SeatEntity,
    ReservationEntity,
  ],
});
