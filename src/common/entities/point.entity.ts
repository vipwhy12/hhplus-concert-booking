import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('point')
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { comment: '포인트 금액' })
  amount: number;

  @Column('int', { comment: '사용자 아이디' })
  userId: number;
}
