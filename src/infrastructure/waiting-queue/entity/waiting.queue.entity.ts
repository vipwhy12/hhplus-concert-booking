import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { WatingQueueStatus } from 'src/common/enums/waiting.queue.status';

@Entity('waiting_queue')
export class WaitingQueueEntity extends BaseEntity {
  @Column()
  status: WatingQueueStatus;

  @Column({ type: 'datetime', comment: '만료일' })
  expireAt: Date;

  @Column({ type: 'datetime', comment: '활성일', nullable: true })
  activeAt: Date;
}
