import { Payment } from './payment';

export const PaymentRepositoryToken = Symbol('PaymentRepository');
export interface PaymentsRepository {
  //💸 포인트 조회
  getUserPoint(userId: number): Promise<Payment>;

  //💸 포인트 충전
  updatePoint(userId: number, amount: number): Promise<boolean>;
}
