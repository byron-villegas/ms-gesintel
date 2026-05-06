import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { partyScreeningConfig } from '../../config/party-screening.config';
import { OfacRequestDto } from './dto/ofac-request.dto';
import { OfacResponseDto } from './dto/ofac-response.dto';
import { PepRequestDto } from './dto/pep-request.dto';
import { PepResponseDto } from './dto/pep-response.dto';

@Injectable()
export class PartyScreeningService {
  constructor(
    @Inject(partyScreeningConfig.KEY)
    private readonly config: ConfigType<typeof partyScreeningConfig>,
  ) {}

  checkOfac(ofacRequestDto: OfacRequestDto): OfacResponseDto {
    const isOfac = this.config.ofac.some(
      (entry) =>
        entry.rut === ofacRequestDto.rut.toUpperCase() ||
        (entry.names.toLowerCase() === ofacRequestDto.names.toLowerCase() &&
          entry.firstLastName.toLowerCase() ===
            ofacRequestDto.firstLastName.toLowerCase() &&
          entry.birthDate === ofacRequestDto.birthDate),
    );
    return { isOfac };
  }

  checkPep(pepRequestDto: PepRequestDto): PepResponseDto {
    const isPep = this.config.pep.some(
      (entry) => entry.rut === pepRequestDto.rut.toUpperCase(),
    );
    return { isPep };
  }
}
