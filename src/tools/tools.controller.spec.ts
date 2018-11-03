import { Test, TestingModule } from '@nestjs/testing';
import { ToolsController } from './tools.controller';

describe('Tools Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ToolsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ToolsController = module.get<ToolsController>(ToolsController);
    expect(controller).toBeDefined();
  });
});
