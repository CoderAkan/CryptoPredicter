import { Test, TestingModule } from '@nestjs/testing';
import { StockControllerTsController } from './stock.controller.ts.controller';

describe('StockControllerTsController', () => {
  let controller: StockControllerTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockControllerTsController],
    }).compile();

    controller = module.get<StockControllerTsController>(StockControllerTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
