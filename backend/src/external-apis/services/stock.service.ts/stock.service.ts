import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { time } from 'console';
import { StockQuoteDto, StockTimeSeriesDto } from '../../types';

@Injectable()
export class StockService {
    private readonly logger = new Logger(StockService.name)
    private readonly baseURL = 'https://www.alphavantage.co/query'
    private readonly apiKey: string

    constructor(private configService: ConfigService) {
        this.apiKey = this.configService.get<string>('ALPHA_VANTAGE_API_KEY')!
        if (!this.apiKey) {
            throw new Error('ALPHA_VANTAGE_API_KEY is not configured')
        }
    }

    async getStockQuote(symbol: string): Promise<StockQuoteDto> {
        const params = new URLSearchParams({
            function: 'GLOBAL_QUOTE',
            symbol: symbol.toUpperCase(),
            apikey: this.apiKey
        })

        try {
            const response = await fetch(`${this.baseURL}?${params}`)
            const data = await response.json()

            if (data['Error Message']) {
                throw new BadRequestException(data['Error Message'])
            }

            if (data['Note']) {
                throw new BadRequestException(data['API rate limit is exceeded'])
            }

            const quote = data['Global Quote']
            if (!quote) {
                throw new BadRequestException(data['Invalid symbol or no data available'])
            }

            return this.transformStockQuote(quote)
        } catch (error) {
            this.logger.error(`Error fetching stock quote for ${symbol}:`, error)
            throw error
        }
    }
    
    async getIntraDayData(symbol: string, interval: string = '5min'): Promise<StockTimeSeriesDto[]> {
        const params = new URLSearchParams({
            function: 'TIME_SERIES_INTRADAY',
            symbol: symbol.toUpperCase(),
            interval: interval,
            apiKey: this.apiKey
        })

        try {
            const response = await fetch(`${this.baseURL}?${params}`)
            const data = await response.json()

            if (data['Error Message']) {
                throw new BadRequestException(data['Error Message'])
            }

            const timeSeries = data[`Time Series (${interval})`]
            if (!timeSeries) {
                throw new BadRequestException('No intraday data available');
            }

            return this.transformTimeSeries(timeSeries)
        } catch (error) {
            this.logger.error(`Error fetching intraday data for ${symbol}:`, error)
            throw error
        }
    }

    async getDailyData(symbol: string): Promise<StockTimeSeriesDto[]> {
        const params = new URLSearchParams({
            function: 'TIME_SERIES_DAILY',
            symbol: symbol.toUpperCase(),
            apiKey: this.apiKey
        })

        try {
            const response = await fetch(`${this.baseURL}?${params}`)
            const data = await response.json()

            if (data['Error Message']) {
                throw new BadRequestException(data['Error Message'])
            }

            const timeSeries = data[`Time Series (Daily)`]
            if (!timeSeries) {
                throw new BadRequestException('No daily data available');
            }

            return this.transformTimeSeries(timeSeries)
        } catch (error) {
            this.logger.error(`Error fetching daily data for ${symbol}:`, error)
            throw error
        }
    }
    
    private transformStockQuote (quote: any): StockQuoteDto {
        return {
            symbol: quote['01. symbol'],
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change']),
            changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
            volume: parseInt(quote['06. volume']),
            lastUpdated: quote['07. latest trading day']
        }
    }

    private transformTimeSeries(timeSeries: any): StockTimeSeriesDto[] {
        return Object.entries(timeSeries).map(([timestamp, data]: [string, any]) => ({
          timestamp: new Date(timestamp),
          open: parseFloat(data['1. open']),
          high: parseFloat(data['2. high']),
          low: parseFloat(data['3. low']),
          close: parseFloat(data['4. close']),
          volume: parseInt(data['5. volume']),
        }));
      }
}
