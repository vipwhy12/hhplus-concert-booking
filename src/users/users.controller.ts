import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  chargePoints(@Body('id') userId: string) {
    return {
      statusCode: '200',
      message: 'success',
      data: { userId },
    };
  }
}
