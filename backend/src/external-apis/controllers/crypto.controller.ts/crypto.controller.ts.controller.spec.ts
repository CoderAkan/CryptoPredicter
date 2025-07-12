import { Test, TestingModule } from '@nestjs/testing';
import { CryptoControllerTsController } from './crypto.controller.ts.controller';

describe('CryptoControllerTsController', () => {
  let controller: CryptoControllerTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoControllerTsController],
    }).compile();

    controller = module.get<CryptoControllerTsController>(CryptoControllerTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
