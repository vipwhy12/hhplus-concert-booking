import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './payment';
import {
  PaymentRepositoryToken,
  PaymentsRepository,
} from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PaymentRepositoryToken)
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  async point(userId: number): Promise<Payment> {
    return await this.paymentsRepository.getUserPoint(userId);
  }

  async chargePoint(userId: number, amount: number): Promise<Payment> {
    if (amount <= 0) {
      throw new Error('The amount must be greater than 0');
    }

    const myPoint = await this.paymentsRepository.getUserPoint(userId);
    const isUpdateSuccessful = await this.paymentsRepository.updatePoint(
      userId,
      myPoint.amount + amount,
    );

    if (!isUpdateSuccessful) {
      throw new Error('Point update failed');
    }

    return {
      ...myPoint,
      amount: myPoint.amount + amount,
    };
  }
}
