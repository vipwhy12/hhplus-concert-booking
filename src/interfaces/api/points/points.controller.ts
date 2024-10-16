import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiChargePoints, ApiGetPoints } from './docs/custom-api.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Payment } from 'src/domain/payments/payment';
import { PointDto } from './dto';
import { PointRequestDto } from './dto/request/points.request';
import { PointsFacade } from 'src/application/points/points.facade';
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('points')
@Controller('points')
@UseGuards(AuthGuard)
export class PointsController {
  constructor(private readonly pointFacade: PointsFacade) {}

  @Get()
  @ApiGetPoints()
  async point(@Request() req: PointRequestDto): Promise<Payment> {
    const { id } = req.user;

    return await this.pointFacade.point(id);
  }

  @Patch()
  @ApiChargePoints()
  async charge(
    @Body() pointDto: PointDto,
    @Request() req: PointRequestDto,
  ): Promise<Payment> {
    const { id } = req.user;
    const { amount } = pointDto;

    return await this.pointFacade.charge(id, amount);
  }
}
