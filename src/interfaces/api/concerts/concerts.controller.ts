import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ConcertsFacade } from 'src/application/concerts/concerts.facade';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ConcertsService } from 'src/domain/concerts/concerts.service';

@Controller('concerts')
export class ConcertsController {
  constructor(
    private readonly concertsPacades: ConcertsFacade,
    private readonly concertsService: ConcertsService,
  ) {}

  //1. 예약 가능한 날짜 조회
  @Get(':concertId/sessions')
  async getAvailableSessions(@Param('concertId') concertId: number) {
    return await this.concertsService.getAvailableSessions(concertId);
  }

  //2. 예약 가능한 날짜의 좌석 조회
  @Get(':concertId/sessions/:sessionId/seats')
  async getAvailableSeats(@Param('sessionId') sessionId: number) {
    return await this.concertsService.getAvailableSeats(sessionId);
  }

  //3. 좌석 예약
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
    @Request() req,
    @Param('sessionId') sessionId: string,
    @Body() paymentData: { reservationId: string; paymentMethod: string },
  ) {
    // const { id } = req.userId;
    // return this.concertsPacades.processPayment(paymentData.reservationId);
  }
}
