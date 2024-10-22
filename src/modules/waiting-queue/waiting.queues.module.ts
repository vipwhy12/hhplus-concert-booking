import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitingQueuesController } from 'src/interfaces/api/waiting-queues/waiting.queues.controller';
import { WaitingQueuesRepositoryToken } from 'src/domain/waiting-queue/waiting.queue.repositoty';
import { WaitingQueuesService } from 'src/domain/waiting-queue/waiting.queue.service';
import { WaitingQueueEntity } from 'src/infrastructure/waiting-queue/entity/waiting.queue.entity';
import { WaitingQueuesRepositoryImpl } from 'src/infrastructure/waiting-queue/waiting.queues.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([WaitingQueueEntity])],
  controllers: [WaitingQueuesController],
  providers: [
    WaitingQueuesService,
    {
      provide: WaitingQueuesRepositoryToken,
      useClass: WaitingQueuesRepositoryImpl,
    },
  ],
})
export class WaitingQueueModule {}
