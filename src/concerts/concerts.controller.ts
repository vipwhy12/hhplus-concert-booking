import {
  Body,
  Controller,
  Param,
  Post,
  Headers,
  Get,
  Query,
} from '@nestjs/common';

@Controller('concerts')
export class ConcertsController {
  //예약 가능한 날짜 조회
  @Get(':concertId/dates/:date')
  getAvailableDates(
    @Param('concertId') concertId: string,
    @Param('date') date: string,
    @Query('status') status: string,
  ) {
    const availableDates = ['2024-05-01', '2024-05-02', '2024-05-03'];
    const concertName = '흑백요리사';

    return {
      statusCode: 200,
      message: 'success',
      data: {
        concertId,
        concertName,
        availableDates,
      },
    };
  }

  // 예약 가능한 좌석 조회 API
  @Get(':concertId/sessions/:sessionId/seats')
  getAvailableSeats(
    @Param('concertId') concertId: string,
    @Param('sessionId') sessionId: string,
    @Query('status') status: string,
  ) {
    const availableSeats = [1, 2, 3, 4, 5];
    const concertName = '흑백요리사';

    return {
      statusCode: 200,
      message: 'success',
      data: {
        concertId,
        sessionId,
        concertName,
        availableSeats,
      },
    };
  }

  // 콘서트 좌석 예약 API (POST 요청)
  @Post(':concertId/sessions/:sessionId/reservations')
  reserveSeat(
    @Param('concertId') concertId: string,
    @Param('sessionId') sessionId: string,
    @Body('seatNumber') seatNumber: number,
    @Headers('WAITING_TOKEN') waitingToken: string,
  ) {
    return {
      statusCode: '200',
      message: 'success',
      data: {
        reservationId: 'resv12345',
        seatNumber,
        status: '예약 성공',
      },
    };
  }

  //콘서트 좌석 예약
  @Post(':concertId/sessions/:sessionId/payments')
  payForReservedSeat(
    @Param('concertId') concertId: string,
    @Param('sessionId') sessionId: string,
    @Body('reservationId') reservationId: string,
    @Headers('WAITING_TOKEN') waitingToken: string,
  ) {
    return {
      statusCode: 200,
      message: 'success',
      data: {
        reservationId,
        seatNumber: 25,
        status: '예약 성공',
      },
    };
  }
}
