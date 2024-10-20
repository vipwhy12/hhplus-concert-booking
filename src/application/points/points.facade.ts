import { AuthService } from 'src/domain/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { Payment } from 'src/domain/payments/payment';
import { PaymentsService } from 'src/domain/payments/payments.service';

@Injectable()
export class PointsFacade {
  constructor(
    private readonly authService: AuthService,
    private readonly paymentService: PaymentsService,
  ) {}

  async point(userId: number): Promise<Payment> {
    await this.authService.checkUserExists(userId);
    return await this.paymentService.point(userId);
  }

  async charge(userId: number, amount: number) {
    await this.authService.checkUserExists(userId);
    return await this.paymentService.chargePoint(userId, amount);
  }
}
