import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthHeaderDto } from '../auth/auth.header.dto';
import { PointsFacade } from 'src/application/points/points.facade';
import { PointRequestDto } from './dto/point.dto';
import { PointResponseDto } from './dto/points.response';
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  SwaggerChargePoints,
  SwaggerGetPoints,
  SwaggerPointController,
} from 'src/common/docs/point.document';

@Controller('points')
@UseGuards(AuthGuard)
@SwaggerPointController()
export class PointsController {
  constructor(private readonly pointFacade: PointsFacade) {}

  @Get()
  @SwaggerGetPoints()
  async point(@Request() user: AuthHeaderDto): Promise<PointResponseDto> {
    const { id } = user;

    return await this.pointFacade.point(id);
  }

  @Patch()
  @SwaggerChargePoints()
  async charge(
    @Request() user: AuthHeaderDto,
    @Body() pointDto: PointRequestDto,
  ): Promise<PointResponseDto> {
    const { id } = user;
    const { amount } = pointDto;

    return await this.pointFacade.charge(id, amount);
  }
}
