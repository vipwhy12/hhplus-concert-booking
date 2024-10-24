import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './model/payment';
import {
  PaymentsRepository,
  PaymentRepositoryToken,
} from './payments.repository';
import { InvalidPointException } from 'src/common/exception/invalid.point.exception';
import { PointUpdateFailedException } from 'src/common/exception/point.update.failed.exception';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PaymentRepositoryToken)
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  async getPointByUserId(userId: number): Promise<Payment> {
    return await this.paymentsRepository.getPointByUserId(userId);
  }

  async chargePoint(userId: number, chargePoint: number): Promise<Payment> {
    if (chargePoint < 1) throw new InvalidPointException();

    const currentPoint = await this.paymentsRepository.getPointByUserId(userId);
    const totalPoint = currentPoint.amount + chargePoint;
    const isUpdateSuccessful = await this.paymentsRepository.isPointUpdated(
      userId,
      totalPoint,
    );

    if (!isUpdateSuccessful) throw new PointUpdateFailedException();
    return new Payment(userId, totalPoint);
  }
}
