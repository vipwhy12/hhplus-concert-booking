import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ReservationStatus } from '../enums/reserve.status';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  seatId: number;

  @Column({ type: 'int' })
  concertSessionId: number;

  @Column({ type: 'varchar', length: 255 })
  status: ReservationStatus;
}
