import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsRepository } from 'src/domain/payments/payments.repository';
import { Point } from 'src/common/entities/point.entity';
import { Payment } from 'src/domain/payments/payment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentRepositoryImpl implements PaymentsRepository {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}

  async getUserPoint(userId: number): Promise<Payment> {
    const point = await this.pointRepository.findOne({ where: { userId } });
    return new Payment(point.userId, point.amount);
  }

  async updatePoint(userId: number, amount: number): Promise<boolean> {
    const result = await this.pointRepository.update(
      { userId }, // 조건
      { amount }, // 업데이트 내용
    );

    return result.affected > 0;
  }
}
