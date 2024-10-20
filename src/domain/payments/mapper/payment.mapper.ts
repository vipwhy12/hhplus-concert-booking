import { Payment } from '../model/payment';
import { Point } from 'src/infrastructure/payments/entity/point.entity';
import { PointResponseDto } from 'src/interfaces/api/points/dto/response/points.response';

export class PaymentMapper {
  static toResponseDto(payment: Payment): PointResponseDto {
    return new PointResponseDto(payment.userId, payment.amount);
  }

  static toDomain(point: Point): Payment {
    return new Payment(point.userId, point.amount);
  }
}
