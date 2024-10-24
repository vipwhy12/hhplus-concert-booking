import { AuthRepositoryImpl } from 'src/infrastructure/auth/auth.repository.impl';
import { AuthRepositoryToken } from 'src/domain/auth/auth.repository';
import { AuthService } from 'src/domain/auth/auth.service';
import { Module } from '@nestjs/common';
import { PaymentRepositoryImpl } from 'src/infrastructure/payments/payment.repository.impl';
import { PaymentRepositoryToken } from 'src/domain/payments/payments.repository';
import { PaymentsService } from 'src/domain/payments/payments.service';
import { PointsController } from 'src/interfaces/api/points/points.controller';
import { PointsFacade } from 'src/application/points/points.facade';
import { Point } from 'src/infrastructure/payments/entity/point.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/auth/entity/user.entity';
import { Logger } from 'winston';

@Module({
  imports: [TypeOrmModule.forFeature([Point, UserEntity])],
  controllers: [PointsController],
  providers: [
    AuthService,
    PointsFacade,
    PaymentsService,
    Logger,
    { provide: PaymentRepositoryToken, useClass: PaymentRepositoryImpl },
    { provide: AuthRepositoryToken, useClass: AuthRepositoryImpl },
  ],
})
export class PointModule {}
