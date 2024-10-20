import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ type: 'datetime', comment: '생성일' })
  readonly createAt: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '수정일' })
  readonly updatedAt: Date;
}
