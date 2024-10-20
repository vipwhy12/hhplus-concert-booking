import { ApiChargePoints, ApiGetPoints } from './docs/custom-api.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PointRequestDto } from './dto/request/points.request';
import { PointsFacade } from 'src/application/points/points.facade';
import { PointResponseDto } from './dto/response/points.response';
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PointDto } from './dto/point.dto';

@Controller('points')
@UseGuards(AuthGuard)
export class PointsController {
  constructor(private readonly pointFacade: PointsFacade) {}

  @Get()
  @ApiGetPoints()
  async point(@Request() req: PointRequestDto): Promise<PointResponseDto> {
    const { id } = req.user;

    return await this.pointFacade.point(id);
  }

  @Patch()
  @ApiChargePoints()
  async charge(
    @Request() req: PointRequestDto,
    @Body() pointDto: PointDto,
  ): Promise<PointResponseDto> {
    const { id } = req.user;

    return await this.pointFacade.charge(id, pointDto.amount);
  }
}
