import { InjectRepository } from '@nestjs/typeorm';
import { WaitingQueuesRepository } from 'src/domain/waiting-queue/waiting.queue.repositoty';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';
import { WaitingQueueEntity } from './entity/waiting.queue.entity';
import { WaitingQueueMapper } from 'src/domain/waiting-queue/mapper/waiting.queue.mapper';
import { WaitingQueue } from 'src/domain/waiting-queue/model/waiting.queue';

@Injectable()
export class WaitingQueuesRepositoryImpl implements WaitingQueuesRepository {
  constructor(
    @InjectRepository(WaitingQueueEntity)
    private readonly waitingQueuesRepository: Repository<WaitingQueueEntity>,
  ) {}

  async getWaitingQueueById(id: number): Promise<WaitingQueue> {
    const waitingQueue = await this.waitingQueuesRepository.findOne({
      where: { id },
    });

    return WaitingQueueMapper.toDomain(waitingQueue);
  }

  async addToWaitingQueue(expireAt: Date): Promise<WaitingQueue> {
    const waitingQueue = await this.waitingQueuesRepository.save({
      status: WatingQueueStatus.WAITING,
      expireAt,
    });

    return WaitingQueueMapper.toDomain(waitingQueue);
  }

  async findExpiredQueues(now: Date) {
    const result = await this.waitingQueuesRepository.find({
      where: { status: WatingQueueStatus.WAITING, expireAt: now },
    });

    return result;
  }

  async updateStatus(id: any, status: WatingQueueStatus) {
    const result = await this.waitingQueuesRepository.update(
      { id },
      { status },
    );

    return result;
  }

  getPositionInQueue(id: number) {
    throw new Error('Method not implemented.');
  }

  async getWaitingQueues() {
    const result = await this.waitingQueuesRepository.find({
      where: { status: WatingQueueStatus.WAITING },
      order: { createAt: 'ASC' },
      take: 20,
    });

    return result;
  }
}
