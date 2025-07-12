import { Test, TestingModule } from '@nestjs/testing';
import { CryptoServiceTsService } from './crypto.service.ts.service';

describe('CryptoServiceTsService', () => {
  let service: CryptoServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoServiceTsService],
    }).compile();

    service = module.get<CryptoServiceTsService>(CryptoServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
