import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ConcertsFacade } from 'src/application/concerts/concerts.facade';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PointRequestDto } from '../points/dto/request/points.request';
import { ReservationsService } from 'src/domain/reservations/reservation.service';

@Controller('concerts')
export class ConcertsController {
  constructor(
    private readonly concertsPacades: ConcertsFacade,
    private readonly reservationsService: ReservationsService,
  ) {}

  //예약 가능한 날짜 조회
  @Get(':concertId/sessions')
  async getAvailableSessions(
    @Param('concertId') concertId: number,
    @Query('date') date: Date,
  ) {
    return await this.reservationsService.getAvailableSessions(concertId, date);
  }

  //예약 가능한 날짜의 좌석 조회
  //TODO: 토큰 검증
  @Get(':concertId/sessions/:sessionId/seats')
  async getAvailableSeats(@Param('sessionId') sessionId: number) {
    return await this.reservationsService.getAvailableSeats(sessionId);
  }

  // 좌석 예약하기
  //TODO: 토큰 검증
  @UseGuards(AuthGuard)
  @Post(':concertId/sessions/:sessionId/reservations')
  async reserveSeat(
    @Param('sessionId') sessionId: number,
    @Body() reservationData: { seatId: number; userId: number },
  ) {
    return await this.concertsPacades.reserveSeat(
      reservationData.seatId,
      sessionId,
      reservationData.userId,
    );
  }

  // 결제 처리 로직 추가
  @UseGuards(AuthGuard)
  @Post(':concertId/sessions/:sessionId/payments')
  processPayment(
    @Request() req: PointRequestDto,
    @Param('sessionId') sessionId: string,
    @Body() paymentData: { reservationId: string; paymentMethod: string },
  ) {
    const { id } = req.user;

    return this.concertsPacades.processPayment(paymentData.reservationId);
  }
}
