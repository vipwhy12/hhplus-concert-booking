import { Injectable } from '@nestjs/common';
import { PaymentsService } from 'src/domain/payments/payments.service';
import { UsersService } from 'src/domain/users/users.service';

@Injectable()
export class PointsFacade {
  constructor(
    private readonly userService: UsersService,
    private readonly paymentService: PaymentsService,
  ) {}

  async point(userId: number) {
    await this.userService.isValidUser(userId);
    return await this.paymentService.point(userId);
  }

  async charge(userId: number, amount: number) {
    await this.userService.isValidUser(userId);
    return await this.paymentService.chargePoint(userId, amount);
  }
}
