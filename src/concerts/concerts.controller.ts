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
  @Get(':concertId/sessions/:sessionId/dates/:date')
  getAvailableDates(
    @Param('concertId') concertId: string,
    @Param('sessionId') sessionId: string,
    @Param('date') date: string,
    @Query('status') status: string,
  ) {
    const availableDates = ['2024-05-01', '2024-05-02', '2024-05-03'];
    const constantsName = '흑백요리사';
    return {
      statusCode: 200,
      message: 'success',
      data: {
        concertId,
        constantsName,
        availableDates,
      },
    };
  }

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
