import { ConcertModule } from './concert/concert.module';
import { Module } from '@nestjs/common';
import { PointModule } from './point/point.module';
import { WaitingQueueModule } from './waiting-queue/waiting.queues.module';

@Module({
  imports: [ConcertModule, PointModule, WaitingQueueModule],
})
export class DomainModule {}
