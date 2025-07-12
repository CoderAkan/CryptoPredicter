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