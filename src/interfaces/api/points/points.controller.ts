import { ApiChargePoints, ApiGetPoints } from './docs/custom-api.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PointDto } from './dto';
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

@Controller('points')
@UseGuards(AuthGuard)
export class PointsController {
  constructor(private readonly pointFacade: PointsFacade) {}

  @Get()
  @ApiGetPoints()
  async point(@Request() req: PointRequestDto): Promise<PointResponseDto> {
    const { id } = req.user;
    const { userId, amount } = await this.pointFacade.point(id);

    return new PointResponseDto(userId, amount);
  }

  @Patch()
  @ApiChargePoints()
  async charge(
    @Request() req: PointRequestDto,
    @Body() pointDto: PointDto,
  ): Promise<PointResponseDto> {
    const { id } = req.user;
    const { userId, amount } = await this.pointFacade.charge(
      id,
      pointDto.amount,
    );

    return new PointResponseDto(userId, amount);
  }
}