import { registerAs } from '@nestjs/config';
import partyScreeningData from './data/party-screening.json';

export interface PartyScreeningEntry {
  rut: string;
  names: string;
  firstLastName: string;
  secondLastName: string;
  birthDate: string;
  charge?: string;
}

export const partyScreeningConfig = registerAs('partyScreening', () => ({
  ofac: partyScreeningData.ofac as PartyScreeningEntry[],
  pep: partyScreeningData.pep as PartyScreeningEntry[],
}));
