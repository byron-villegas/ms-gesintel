import { Test, TestingModule } from '@nestjs/testing';
import { PartyScreeningController } from './party-screening.controller';
import { PartyScreeningModule } from './party-screening.module';
import { PartyScreeningService } from './party-screening.service';

describe('PartyScreeningModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PartyScreeningModule],
    }).compile();
  });

  it('should compile module', () => {
    expect(module).toBeDefined();
  });

  it('should provide PartyScreeningService', () => {
    const service = module.get<PartyScreeningService>(PartyScreeningService);
    expect(service).toBeDefined();
  });

  it('should register PartyScreeningController', () => {
    const controller = module.get<PartyScreeningController>(PartyScreeningController);
    expect(controller).toBeDefined();
  });
});
