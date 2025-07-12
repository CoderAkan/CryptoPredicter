import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptoController } from './controllers/crypto.controller.ts/crypto.controller.ts.controller';
import { StockController } from './controllers/stock.controller.ts/stock.controller.ts.controller';
import { CryptoService } from './services/crypto.service.ts/crypto.service.ts.service';
import { StockService } from './services/stock.service.ts/stock.service.ts.service';

@Module({
  imports: [ConfigModule],
  controllers: [CryptoController, StockController],
  providers: [CryptoService, StockService],
  exports: [CryptoService, StockService]
})
export class ExternalApisModule {}
