import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  @Get()
  findAll(
    @Query('assetId') assetId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string
  ) {
    return this.pricesService.findAll(assetId, from, to);
  }

  @Get('asset/:assetId')
  findByAsset(@Param('assetId') assetId: string) {
    return this.pricesService.findByAsset(assetId);
  }

  @Get('latest/:assetId')
  findLatest(@Param('assetId') assetId: string) {
    return this.pricesService.findLatest(assetId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricesService.remove(id);
  }
}
