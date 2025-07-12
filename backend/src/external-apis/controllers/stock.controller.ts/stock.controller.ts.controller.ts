import { Controller, Get, Param, Query } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger' 
import { StockService } from 'src/external-apis/services/stock.service.ts/stock.service.ts.service';
import { StockQuoteDto, StockTimeSeriesDto } from 'src/external-apis/types';

// @ApiTags('stocks')
@Controller('stocks')
export class StockController {
    constructor (private readonly stockService: StockService) {}

    @Get(':symbol/quote')
    // @ApiOperation({summary: 'Get stock quote'})
    // @ApiParam({name: 'symbol', description: 'Stock symbol (e.g., AAPL, MSFT)' })
    // @ApiResponse({status: 200, description: 'Stock quote retrieved successfully', type: StockQuoteDto})
    async getStockQuote(@Param('symbol') symbol: string): Promise<StockQuoteDto> {
        return this.stockService.getStockQuote(symbol)
    }

    @Get(':symbol/intraday')
    // @ApiOperation({summary: 'Get intraday stock data'})
    // @ApiParam({name: 'symbol', description: 'Stock symbol (e.g., AAPL, MSFT)'})
    // @ApiQuery({name: 'interval', required: false, description: 'Time interval (1min, 5min, 15min, 30min, 60min)'})
    // @ApiResponse({status: 200, description: 'Intraday data retrieved successfully', type: [StockTimeSeriesDto]})
    async getIntradayData(
        @Param('symbol') symbol: string,
        @Query('interval') interval: string = '5min'
    ): Promise<StockTimeSeriesDto[]> {
        return this.stockService.getIntraDayData(symbol, interval)
    }

    @Get(':symbol/daily')
    // @ApiOperation({summary: 'Get daily stock data'})
    // @ApiParam({name: 'symbol', description: 'Stock symbol (e.g., AAPL, MSFT)'})
    // @ApiResponse({status: 200, description: 'Daily data retrieved successfully', type: [StockTimeSeriesDto]})
    async getDailyData(@Param('symbol') symbol: string): Promise<StockTimeSeriesDto[]> {
        return this.stockService.getDailyData(symbol)
    }



}
