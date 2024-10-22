import { PointResponseDto } from 'src/interfaces/api/points/dto/points.response';
import { Payment } from '../model/payment';
import { Point } from 'src/infrastructure/payments/entity/point.entity';

export class PaymentMapper {
  static toResponseDto(payment: Payment): PointResponseDto {
    const { userId, amount } = payment;

    return new PointResponseDto(userId, amount);
  }

  static toDomain(point: Point): Payment {
    const { userId, amount } = point;

    return new Payment(userId, amount);
  }
}
