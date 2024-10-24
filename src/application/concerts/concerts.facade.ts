import { AuthService } from 'src/domain/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { ConcertsService } from 'src/domain/concerts/concerts.service';

@Injectable()
export class ConcertsFacade {
  constructor(
    private readonly concertService: ConcertsService,
    private readonly authService: AuthService,
  ) {}

  //3. 좌석 예약하기
  //TODO: 트랙잭션 처리
  async reserveSeat(seatId: number, sessionId: number, userId: number) {
    //3-1 특정 좌석 예약 가능 여부 확인
    await this.concertService.isReservableSeat(sessionId, seatId);

    //3-2 예약이 가능하다면, 좌석 상태 변경
    await this.concertService.updateSeatStatus(sessionId, seatId);

    //3-3 예약 정보 저장
    const reservation = await this.concertService.saveReservationInfo(
      sessionId,
      seatId,
      userId,
    );

    //3-4. 예약 정보 반환
    return reservation;
  }

  //4. 결제 하기
  //TODO: 트랙잭션 처리
  async processPayment(reservationId: number) {
    //4-0. 토큰 확인
    //4-0. 예약 확인
    // const reservation =
    //   await this.reservationsService.getReservationById(reservationId);
    // const { userId, sessionId, seatId } = reservation;
    // //4-1. 유저 확인
    // await this.userService.isValidUser(userId);
    // //컨포넌트 파인더? 오...
    // //userFinder
    // //4-2. 콘서트 가격 확인
    // await this.reservationsService.getSessionById(sessionId);
    // //4-3 좌석 예약 정보확인
    // await this.reservationsService.isReservableSeat(seatId);
    // //4-4. 좌석
    // await this.reservationsService.updateSeatStatus(sessionId, userId);
    // //4-5. 예약 정보 저장
    // await this.reservationsService.saveReservationInfo(
    //   concertId,
    //   sessionId,
    //   userId,
    // );
    //4-6. 포인트 사용!!!
  }
}
