import { Controller, Get, Param } from '@nestjs/common';

@Controller('users/:userId/points')
export class PointsController {
  @Get()
  getPoints(@Param('userId') userId: string) {
    return {
      statusCode: '200',
      message: 'success',
      data: {
        userId,
        point: 5000,
      },
    };
  }
}
