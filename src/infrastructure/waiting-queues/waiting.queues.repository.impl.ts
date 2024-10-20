import { InjectRepository } from '@nestjs/typeorm';
import { WaitingQueuesRepository } from 'src/domain/waiting-queue/waiting.queue.repositoty';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';
import { WaitingQueuesEntity } from './entity/waiting.queue.entity';

@Injectable()
export class WaitingQueuesRepositoryImpl implements WaitingQueuesRepository {
  constructor(
    @InjectRepository(WaitingQueuesEntity)
    private readonly waitingQueuesRepository: Repository<WaitingQueuesEntity>,
  ) {}

  //TODO: 형변환 필요
  async getWaitingQueueById(id: number) {
    const result = await this.waitingQueuesRepository.findOne({
      where: { id },
    });

    return result;
  }

  async addToWaitingQueue(expireAt: Date) {
    const waitingQueue = this.waitingQueuesRepository.save({
      status: WatingQueueStatus.WAITING,
      expireAt,
    });

    return waitingQueue;
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
      order: { createdAt: 'ASC' },
      take: 20,
    });

    return result;
  }
}
