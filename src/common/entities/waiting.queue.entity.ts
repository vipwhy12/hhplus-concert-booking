import { WatingQueueStatus } from 'src/domain/waiting-queue/enum/waiting.queue.status';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('waiting_queue')
export class WaitingQueuesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: WatingQueueStatus;

  @CreateDateColumn({ type: 'datetime', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '수정일' })
  updatedAt: Date;

  @Column({ type: 'datetime', comment: '만료일' })
  expireAt: Date;

  @Column({ type: 'datetime', comment: '활성일', nullable: true })
  activeAt: Date;
}
