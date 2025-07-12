import { IsString, IsOptional, IsDecimal, IsEnum, isString } from 'class-validator';

export enum AssetType {
    STOCK = 'STOCK',
    BOND = 'BOND',
    CRYPTO = 'CRYPTO',
    COMMODITY = 'COMMODITY',
}

export class CreateAssetDto {
  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsEnum(AssetType)
  type: AssetType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  currentPrice?: number;
}
