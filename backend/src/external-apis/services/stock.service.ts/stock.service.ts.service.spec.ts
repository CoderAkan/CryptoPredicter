import { Test, TestingModule } from '@nestjs/testing';
import { StockServiceTsService } from './stock.service.ts.service';

describe('StockServiceTsService', () => {
  let service: StockServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockServiceTsService],
    }).compile();

    service = module.get<StockServiceTsService>(StockServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
