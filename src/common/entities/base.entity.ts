import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: bigint;

  @CreateDateColumn({ type: 'datetime', comment: '생성일' })
  readonly createAt: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '수정일' })
  readonly updatedAt: Date;
}
