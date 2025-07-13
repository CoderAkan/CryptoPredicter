export interface StockQuoteDto {
    symbol: string,
    price: number,
    change: number,
    changePercent: number,
    volume: number,
    lastUpdated: Date
}

export interface StockTimeSeriesDto {
    timestamp: Date,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number
}


export interface SimplerCryptoPriceDto {
    coin_symbol: string;
    price: number;
    percent_change_24h: number;
    last_updated: Date;
}

export interface SimplerTopCoinDto {
    id: string,
    symbol: string,
    slug: string,
    name: string,
    price: number,
    percent_change_24h: number,
    market_cap: number, 
    volume_24h: number,
    cmc_rank: number
}