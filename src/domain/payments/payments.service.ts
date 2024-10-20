import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './model/payment';
import {
  PaymentsRepository,
  PaymentRepositoryToken,
} from './payments.repository';

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
    if (chargePoint < 1) throw new Error('The amount must be greater than 0');

    const currentPoint = await this.paymentsRepository.getPointByUserId(userId);
    const totalPoint = currentPoint.amount + chargePoint;
    const isUpdateSuccessful = await this.paymentsRepository.isPointUpdated(
      userId,
      totalPoint,
    );

    if (!isUpdateSuccessful) throw new Error('Point update failed');

    return new Payment(userId, totalPoint);
  }
}
