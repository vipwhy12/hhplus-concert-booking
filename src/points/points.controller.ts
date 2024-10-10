import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users/:userId/points')
export class PointsController {
  @Get()
  getPoints(@Param('userId') userId: string) {
    const point = 5000;

    return {
      statusCode: '200',
      message: 'success',
      data: { userId, point },
    };
  }

  @Post()
  chargePoints(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
  ) {
    const existingPoints = 4000;
    const point = existingPoints + amount;

    return {
      statusCode: '200',
      message: 'success',
      data: { userId, point },
    };
  }
}
