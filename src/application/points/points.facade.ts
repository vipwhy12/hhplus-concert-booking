import { AuthService } from 'src/domain/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { PaymentsService } from 'src/domain/payments/payments.service';
import { PaymentMapper } from 'src/domain/payments/mapper/payment.mapper';
import { PointResponseDto } from 'src/interfaces/api/points/dto/points.response';

@Injectable()
export class PointsFacade {
  constructor(
    private readonly authService: AuthService,
    private readonly paymentService: PaymentsService,
  ) {}

  async point(userId: number): Promise<PointResponseDto> {
    const checkUser = await this.authService.checkUserExists(userId);
    const point = await this.paymentService.getPointByUserId(userId);

    return PaymentMapper.toResponseDto(point);
  }

  async charge(userId: number, amount: number): Promise<PointResponseDto> {
    const checkUser = await this.authService.checkUserExists(userId);
    const chargePoint = await this.paymentService.chargePoint(userId, amount);

    return PaymentMapper.toResponseDto(chargePoint);
  }
}
