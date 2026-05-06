import { ConfigType } from '@nestjs/config';
import { partyScreeningConfig } from '../../config/party-screening.config';
import { PartyScreeningService } from './party-screening.service';

const mockConfig: ConfigType<typeof partyScreeningConfig> = {
  ofac: [
    {
      rut: '12345678-9',
      names: 'John',
      firstLastName: 'Doe',
      secondLastName: 'Smith',
      birthDate: '1990-01-01',
    },
  ],
  pep: [{ rut: '98765432-1', names: 'Jane', firstLastName: 'Smith', secondLastName: 'Doe', birthDate: '1985-05-15', charge: 'Official' }],
};

describe('PartyScreeningService', () => {
  let service: PartyScreeningService;

  beforeEach(() => {
    service = new PartyScreeningService(mockConfig);
  });

  describe('checkOfac', () => {
    it('should return isOfac=true when rut is in OFAC list', () => {
      const result = service.checkOfac({
        rut: '12345678-9',
        names: 'John',
        firstLastName: 'Doe',
        secondLastName: 'Smith',
        birthDate: '1990-01-01',
      });

      expect(result).toEqual({ isOfac: true });
    });

    it('should return isOfac=false when rut is not in OFAC list', () => {
      const result = service.checkOfac({
        rut: '11111111-1',
        names: 'Juan Carlos',
        firstLastName: 'Bodoque',
        secondLastName: 'Trivino',
        birthDate: '1996-06-22',
      });

      expect(result).toEqual({ isOfac: false });
    });

    it('should return isOfac=true when names, firstLastName and birthDate match even if rut differs', () => {
      const result = service.checkOfac({
        rut: '99999999-9',
        names: 'John',
        firstLastName: 'Doe',
        secondLastName: 'Other',
        birthDate: '1990-01-01',
      });

      expect(result).toEqual({ isOfac: true });
    });
  });

  describe('checkPep', () => {
    it('should return isPep=true when rut is in PEP list', () => {
      const result = service.checkPep({ rut: '98765432-1' });

      expect(result).toEqual({ isPep: true });
    });

    it('should return isPep=false when rut is not in PEP list', () => {
      const result = service.checkPep({ rut: '11111111-1' });

      expect(result).toEqual({ isPep: false });
    });
  });
});
