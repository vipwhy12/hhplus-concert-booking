import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsFacade } from 'src/application/points/points.facade';
import { UserEntity } from 'src/common/entities/user.entity';
import { PaymentRepositoryToken } from 'src/domain/payments/payments.repository';
import { PaymentsService } from 'src/domain/payments/payments.service';
import { UsersRepositoryToken } from 'src/domain/users/users.repository';
import { UsersService } from 'src/domain/users/users.service';
import { PointEntity } from 'src/infrastructure/payments/entity/point.entity';
import { PaymentRepositoryImpl } from 'src/infrastructure/payments/payment.repository.impl';
import { UsersRepositoryImpl } from 'src/infrastructure/users/users.repository.impl';
import { PointsController } from 'src/interfaces/api/points/points.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PointEntity, UserEntity])],
  controllers: [PointsController],
  providers: [
    PointsFacade,
    PaymentsService,
    UsersService,
    { provide: PaymentRepositoryToken, useClass: PaymentRepositoryImpl },
    { provide: UsersRepositoryToken, useClass: UsersRepositoryImpl },
  ],
})
export class PointModule {}
