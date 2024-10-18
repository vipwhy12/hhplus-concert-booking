import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class ConcertEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({ type: 'datetime', comment: '생성일' })
  createAt: Date;

  @Column()
  title: string;
}
