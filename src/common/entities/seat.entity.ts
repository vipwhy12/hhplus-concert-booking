import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SeatStatus } from '../enum/seat.status';

@Entity('seat')
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { comment: '공연 번호' })
  sessionId: number;

  @Column('int', { comment: '좌석 번호' })
  seat_number: number;

  @Column('varchar', { comment: '좌석 상태' })
  status: SeatStatus;
}
