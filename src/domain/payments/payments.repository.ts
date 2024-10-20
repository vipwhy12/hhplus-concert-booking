import { Payment } from './model/payment';

export const PaymentRepositoryToken = Symbol('PaymentRepository');
export interface PaymentsRepository {
  //💸 포인트 조회
  getPointByUserId(id: number): Promise<Payment>;

  //💸 포인트 충전
  isPointUpdated(userId: number, amount: number): Promise<boolean>;
}
