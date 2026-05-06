import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { partyScreeningConfig } from './config/party-screening.config';
import { PartyScreeningModule } from './compliance/party-screening/party-screening.module';
import { buildPinoHttpOptions } from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [partyScreeningConfig],
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: buildPinoHttpOptions(),
    }),
    PartyScreeningModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
