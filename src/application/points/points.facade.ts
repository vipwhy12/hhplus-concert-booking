import { Injectable } from '@nestjs/common';
import { Payment } from 'src/domain/payments/payment';
import { PaymentsService } from 'src/domain/payments/payments.service';
import { UsersService } from 'src/domain/users/users.service';

@Injectable()
export class PointsFacade {
  constructor(
    private readonly userService: UsersService,
    private readonly paymentService: PaymentsService,
  ) {}

  async point(userId: number): Promise<Payment> {
    await this.userService.isValidUser(userId);

    return await this.paymentService.point(userId);
  }

  async charge(userId: number, amount: number) {
    await this.userService.isValidUser(userId);

    return await this.paymentService.chargePoint(userId, amount);
  }
}
