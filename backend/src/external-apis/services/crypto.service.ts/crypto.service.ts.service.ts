import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
    private readonly logger = new Logger(CryptoService.name)
    private readonly baseURL = ''
    private readonly apiKey: string

    constructor (private configService: ConfigService) {
        this.apiKey = this.configService.get<string>('BINANCE_API_KEY')
        if (!this.apiKey) {
            throw new Error("BINANCE_API_KEY is not configured") 
        }
    }
}
