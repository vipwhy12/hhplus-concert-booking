import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsRepository } from 'src/domain/payments/payments.repository';
import { Injectable } from '@nestjs/common';
import { Point } from './entity/point.entity';
import { PaymentMapper } from 'src/domain/payments/mapper/payment.mapper';
import { Payment } from 'src/domain/payments/model/payment';

@Injectable()
export class PaymentRepositoryImpl implements PaymentsRepository {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}

  async getPointByUserId(userId: number): Promise<Payment> {
    const point = await this.pointRepository.findOne({ where: { userId } });
    return PaymentMapper.toDomain(point);
  }

  async isPointUpdated(userId: number, amount: number): Promise<boolean> {
    const result = await this.pointRepository.update(
      { userId }, // 조건
      { amount }, // 업데이트 내용
    );

    return result.affected > 0;
  }
}
