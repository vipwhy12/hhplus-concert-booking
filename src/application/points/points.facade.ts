import { AuthService } from 'src/domain/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { PaymentsService } from 'src/domain/payments/payments.service';
import { PointResponseDto } from 'src/interfaces/api/points/dto/response/points.response';
import { PaymentMapper } from 'src/domain/payments/mapper/payment.mapper';

@Injectable()
export class PointsFacade {
  constructor(
    private readonly authService: AuthService,
    private readonly paymentService: PaymentsService,
  ) {}

  //TODO: response 여기서 반환하고 바꿔주는게 올바른가?
  //TODO: 유저 확인 메서드로 따로 빼기?!
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
