import { AuthRepositoryImpl } from 'src/infrastructure/auth/auth.repository.impl';
import { AuthRepositoryToken } from 'src/domain/auth/auth.repository';
import { AuthService } from 'src/domain/auth/auth.service';
import { Module } from '@nestjs/common';
import { PaymentRepositoryImpl } from 'src/infrastructure/payments/payment.repository.impl';
import { PaymentRepositoryToken } from 'src/domain/payments/payments.repository';
import { PaymentsService } from 'src/domain/payments/payments.service';
import { PointsController } from 'src/interfaces/api/points/points.controller';
import { PointsFacade } from 'src/application/points/points.facade';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/auth/entity/user.entity';
import { Point } from 'src/infrastructure/payments/entity/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point, UserEntity])],
  controllers: [PointsController],
  providers: [
    PointsFacade,
    PaymentsService,
    AuthService,
    { provide: PaymentRepositoryToken, useClass: PaymentRepositoryImpl },
    { provide: AuthRepositoryToken, useClass: AuthRepositoryImpl },
  ],
})
export class PointModule {}
