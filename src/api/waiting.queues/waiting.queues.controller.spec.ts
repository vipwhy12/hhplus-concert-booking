import { Test, TestingModule } from '@nestjs/testing';
import { WaitingQueuesController } from './waiting.queues.controller';

describe('WaitingQueuesController', () => {
  let controller: WaitingQueuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaitingQueuesController],
    }).compile();

    controller = module.get<WaitingQueuesController>(WaitingQueuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
