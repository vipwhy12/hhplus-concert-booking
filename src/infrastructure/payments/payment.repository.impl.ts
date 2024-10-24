import { EntityManager, Repository } from 'typeorm';
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

  async getPointByUserId(
    userId: number,
    manager: EntityManager,
  ): Promise<Payment> {
    const repository = manager
      ? manager.getRepository(Point)
      : this.pointRepository;

    const point = await repository.findOne({ where: { userId } });
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
