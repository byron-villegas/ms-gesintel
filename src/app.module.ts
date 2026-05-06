import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { partyScreeningConfig } from './config/party-screening.config';
import { PartyScreeningModule } from './compliance/party-screening/party-screening.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [partyScreeningConfig],
      isGlobal: true,
    }),
    PartyScreeningModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
