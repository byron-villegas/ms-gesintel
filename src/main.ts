import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('ms-gesintel');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MS Gesintel API')
    .setDescription(
      'GesIntel Microservice API for party screening and health checks',
    )
    .setVersion('1.0.0')
    .setContact('Byron Villegas Moya', 'https://github.com/byron-villegas/ms-gesintel', 'byronvillegasm@gmail.com')
    .setLicense('MIT', 'https://github.com/byron-villegas/ms-gesintel/blob/main/LICENSE')
    .addServer('http://localhost:3000', 'Local Development Server')
    .addTag('Health', 'Service health endpoints')
    .addTag('Party Screening', 'Endpoints for OFAC and PEP validations')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-ui/index.html', app, swaggerDocument, {
    useGlobalPrefix: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
