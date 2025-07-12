import { IsString, IsDecimal, IsOptional, IsISO8601 } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  assetId: string;

  @IsDecimal()
  price: number;

  @IsOptional()
  @IsISO8601()
  timestamp?: Date;

  @IsOptional()
  @IsString()
  source?: string;
}
