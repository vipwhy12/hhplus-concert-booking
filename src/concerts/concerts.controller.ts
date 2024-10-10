import { Body, Controller, Param, Post, Headers } from '@nestjs/common';

@Controller('concerts')
export class ConcertsController {
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
