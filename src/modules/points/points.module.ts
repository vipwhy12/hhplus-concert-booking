import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsFacade } from 'src/application/points/points.facade';
import { Point } from 'src/common/entities/point.entity';
import { UserEntity } from 'src/common/entities/user.entity';
import { PaymentRepositoryToken } from 'src/domain/payments/payments.repository';
import { PaymentsService } from 'src/domain/payments/payments.service';
import { UsersRepositoryToken } from 'src/domain/users/users.repository';
import { UsersService } from 'src/domain/users/users.service';
import { PaymentRepositoryImpl } from 'src/infrastructure/payments/payment.repository.impl';
import { UsersRepositoryImpl } from 'src/infrastructure/users/users.repository.impl';
import { PointsController } from 'src/interfaces/api/points/points.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Point, UserEntity])],
  controllers: [PointsController],
  providers: [
    PointsFacade,
    PaymentsService,
    UsersService,
    { provide: PaymentRepositoryToken, useClass: PaymentRepositoryImpl },
    { provide: UsersRepositoryToken, useClass: UsersRepositoryImpl },
  ],
})
export class PointsModule {}
