import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CryptoService } from 'src/external-apis/services/crypto.service.ts/crypto.service';
import { SimplerCryptoPriceDto, SimplerTopCoinDto } from 'src/external-apis/types';


@Controller('crypto')
export class CryptoController {
    constructor (private readonly cryptoService: CryptoService) {}
    
    @Get(':coinSymbol/price')
    // @ApiOperation({ summary: 'Get cryptocurrency price' })
    // @ApiParam({ name: 'coinId', description: 'Coin ID (e.g., bitcoin, ethereum)' })
    // @ApiQuery({ name: 'vsCurrency', required: false, description: 'Target currency (default: usd)' })
    // @ApiResponse({ status: 200, description: 'Price retrieved successfully', type: CryptoPriceDto })
    async getCoinPrice(@Param('coinSymbol') coinSymbol: string, @Query('vsCurrency') vsCurrency: string): Promise<SimplerCryptoPriceDto> {
        return this.cryptoService.getCoinPrice(coinSymbol, vsCurrency)
    }

    @Get('top')
    // @ApiOperation({ summary: 'Get top cryptocurrencies' })
    // @ApiQuery({ name: 'limit', required: false, description: 'Number of coins to return (default: 10)' })
    // @ApiResponse({ status: 200, description: 'Top coins retrieved successfully', type: [TopCoinDto] })
    async getTopCoins(@Query("limit", new ParseIntPipe({optional: true})) limit: number): Promise<SimplerTopCoinDto[]> {
        return this.cryptoService.getTopCoins(limit)
    }

}
