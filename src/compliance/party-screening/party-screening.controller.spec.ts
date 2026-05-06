import { Test, TestingModule } from '@nestjs/testing';
import { partyScreeningConfig } from '../../config/party-screening.config';
import { PartyScreeningController } from './party-screening.controller';
import { PartyScreeningService } from './party-screening.service';

const mockConfig = {
  ofac: [{ rut: '12345678-9', name: 'John Doe' }],
  pep: [{ rut: '98765432-1', name: 'Jane Smith' }],
};

describe('PartyScreeningController', () => {
  let controller: PartyScreeningController;
  let service: PartyScreeningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyScreeningController],
      providers: [
        PartyScreeningService,
        { provide: partyScreeningConfig.KEY, useValue: mockConfig },
      ],
    }).compile();

    controller = module.get<PartyScreeningController>(PartyScreeningController);
    service = module.get<PartyScreeningService>(PartyScreeningService);
  });

  it('should call service.checkOfac with request and return result', () => {
    const request = {
      rut: '11111111-1',
      names: 'Juan Carlos',
      firstLastName: 'Bodoque',
      secondLastName: 'Trivino',
      birthDate: '1996-06-22',
    };
    const expected = { isOfac: false };
    const spy = jest.spyOn(service, 'checkOfac').mockReturnValue(expected);

    const result = controller.checkOfac(request);

    expect(spy).toHaveBeenCalledWith(request);
    expect(result).toEqual(expected);
  });

  it('should call service.checkPep with request and return result', () => {
    const request = {
      rut: '11111111-1',
    };
    const expected = { isPep: false };
    const spy = jest.spyOn(service, 'checkPep').mockReturnValue(expected);

    const result = controller.checkPep(request);

    expect(spy).toHaveBeenCalledWith(request);
    expect(result).toEqual(expected);
  });
});
