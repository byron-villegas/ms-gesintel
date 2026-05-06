import { DocumentBuilder } from '@nestjs/swagger';

export function buildSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('MS Gesintel API')
    .setDescription(
      'Gesintel Microservice API for party screening and health checks',
    )
    .setVersion('1.0.0')
    .setContact(
      'Byron Villegas Moya',
      'https://github.com/byron-villegas/ms-gesintel',
      'byronvillegasm@gmail.com',
    )
    .setLicense(
      'MIT',
      'https://github.com/byron-villegas/ms-gesintel/blob/main/LICENSE',
    )
    .addServer('http://localhost:3000', 'Local Development Server')
    .addServer('https://ms-gesintel.vercel.app', 'Vercel Production')
    .addTag('Party Screening', 'Endpoints for OFAC and PEP validations')
    .build();
}