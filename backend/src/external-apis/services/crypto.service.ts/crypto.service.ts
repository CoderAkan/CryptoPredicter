import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SimplerCryptoPriceDto, SimplerTopCoinDto } from 'src/external-apis/types';

@Injectable()
export class CryptoService {
    private readonly logger = new Logger(CryptoService.name)
    private readonly baseURL = 'https://pro-api.coinmarketcap.com'

    async getCoinPrice(coinSymbol: string = 'BTC', vsCurrency: string="usd"): Promise<SimplerCryptoPriceDto> {
        try {
            const response = await fetch(
                `${this.baseURL}/v2/cryptocurrency/quotes/latest?symbol=${coinSymbol}?convert=${vsCurrency}`
            )

            const data = response.json()

            if (!data[coinSymbol]) {
                throw new BadRequestException(`Coin ${coinSymbol} is not found`)
            }

            return this.transformCryptoPrice(data[coinSymbol], coinSymbol)
        } catch (error) {
            this.logger.error(`Error fetching price for ${coinSymbol}:`, error)
            throw error
        }
    }

    async getTopCoins(limit: number=10): Promise<SimplerTopCoinDto[]> {
        try {
            const response = await fetch(
                `${this.baseURL}/v1/cryptocurrency/listings/latest?limit=${limit}`
            )

            const data = response.json()

            if (!Array.isArray(data)) {
                throw new BadRequestException('Unable to fetch top coins')
            }

            return data.map(coin => this.transformTopCoin(coin))
        } catch (error) {
            this.logger.error('Error fetching top coins:', error)
            throw error
        }
    } 

    private transformCryptoPrice(data: any, coinSymbol: string, currency: string="usd"): SimplerCryptoPriceDto {
        return {
            coin_symbol: coinSymbol,
            price: data.quote[currency].price,
            percent_change_24h: data.quote[currency].percent_change_24h,
            last_updated: new Date(data.quote[currency].last_updated * 1000)
        }
    }

    private transformTopCoin(coin: any, currency: string="usd"): SimplerTopCoinDto {
        return {
            id: coin.id,
            symbol: coin.symbol,
            slug: coin.slug,
            name: coin.name,
            price: coin.quote[currency].price,
            percent_change_24h: coin.quote[currency].percent_change_24h,
            market_cap: coin.quote[currency].market_cap,
            volume_24h: coin.quote[currency].volume_24h,
            cmc_rank: coin.cmc_rank
        }
    }

}
