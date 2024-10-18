import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class SessionEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({ type: 'datetime', comment: '생성일' })
  createAt: Date;

  @Column()
  concertId: number;

  @Column()
  date: Date;
}
