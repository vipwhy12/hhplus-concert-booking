import { AuthService } from 'src/domain/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { ConcertsService } from 'src/domain/concerts/concerts.service';
import { DataSource } from 'typeorm';
import { PaymentsService } from 'src/domain/payments/payments.service';

@Injectable()
export class ConcertsFacade {
  constructor(
    private dataSource: DataSource,
    private readonly concertService: ConcertsService,
    private readonly authService: AuthService,
    private readonly paymentService: PaymentsService,
  ) {}

  //3. 좌석 예약하기
  async reserveSeat(seatId: number, sessionId: number, userId: number) {
    await this.dataSource.transaction(async (manager) => {
      await this.authService.checkUserExists(userId, manager);

      //3-1 특정 좌석 예약 가능 여부 확인
      await this.concertService.isReservableSeat(sessionId, seatId, manager);

      //3-2 예약이 가능하다면, 좌석 상태 변경
      await this.concertService.updateSeatStatus(sessionId, seatId, manager);

      //3-3 예약 정보 저장
      const reservation = await this.concertService.saveReservationInfo(
        sessionId,
        seatId,
        userId,
        manager,
      );

      //3-4. 예약 정보 반환
      return reservation;
    });
  }

  //4. 결제 하기
  //TODO: 컨포넌트 파인더 찾아보기
  async processPayment(reservationId: number) {
    await this.dataSource.transaction(async (manager) => {
      const reservation = await this.concertService.getReservationById(
        reservationId,
        manager,
      );

      const { userId, sessionId, seatId } = reservation;

      //4-1. 유저 확인
      await this.authService.checkUserExists(userId, manager);

      //4-2. 좌석 예약 정보확인
      await this.concertService.isReservableSeat(sessionId, seatId, manager);

      await this.paymentService.getPointByUserId(userId, manager);
      // await this.paymentService.chargePoint(userId, 1000);

      //4-4. 좌석
      await this.concertService.updateSeatStatus(sessionId, userId, manager);
    });
  }
}
