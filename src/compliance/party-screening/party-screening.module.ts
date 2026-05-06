import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { partyScreeningConfig } from '../../config/party-screening.config';
import { PartyScreeningController } from './party-screening.controller';
import { PartyScreeningService } from './party-screening.service';

@Module({
  imports: [ConfigModule.forFeature(partyScreeningConfig)],
  controllers: [PartyScreeningController],
  providers: [PartyScreeningService],
})
export class PartyScreeningModule {}
