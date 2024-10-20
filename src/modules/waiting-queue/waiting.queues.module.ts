import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitingQueuesRepositoryToken } from 'src/domain/waiting-queue/waiting.queue.repositoty';
import { WaitingQueuesService } from 'src/domain/waiting-queue/waiting.queue.service';
import { WaitingQueuesEntity } from 'src/infrastructure/waiting-queues/entity/waiting.queue.entity';
import { WaitingQueuesRepositoryImpl } from 'src/infrastructure/waiting-queues/waiting.queues.repository.impl';
import { WaitingQueuesController } from 'src/interfaces/api/waiting-queues/waiting.queues.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WaitingQueuesEntity])],
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
