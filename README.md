# ms-gesintel

<p align="center">
  <a href="https://github.com/byron-villegas/ms-gesintel" target="blank">Gesintel Microservice — Party Screening API</a>
</p>

<p align="center">
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/typescript-5.7.3-blue.svg" alt="TypeScript" /></a>
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/nestjs-11.0.1-red.svg" alt="NestJS" /></a>
  <a href="https://github.com/byron-villegas/ms-gesintel/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <a href="https://ms-gesintel.vercel.app" target="_blank"><img src="https://img.shields.io/badge/deploy-Vercel-black.svg" alt="Deploy" /></a>
</p>

## Description

NestJS microservice for Gesintel party screening. Exposes REST endpoints to evaluate whether a person appears in OFAC sanction lists or qualifies as a Politically Exposed Person (PEP), based on local screening data.

## API documentation (Swagger)

Once the project is running, interactive documentation is available at:

`/api/swagger-ui`

Local example:

`http://localhost:3000/api/swagger-ui`

Vercel production:

`https://ms-gesintel.vercel.app/api/swagger-ui`

Includes:

- General project endpoints.
- `party-screening` module endpoints.
- OFAC and PEP request/response schemas.
- DTO validation rules reflected in OpenAPI.

## Main endpoints

- `POST /api/party-screening/ofac` - Screening OFAC.
- `POST /api/party-screening/pep` - Screening PEP.

## Usage examples

### POST /api/party-screening/ofac

Request:

```json
{
  "rut": "11111111-1",
  "names": "Juan Carlos",
  "firstLastName": "Bodoque",
  "secondLastName": "Triviño",
  "birthDate": "1996-06-22"
}
```

Response 200:

```json
{
  "isOfac": false
}
```

### POST /api/party-screening/pep

Request:

```json
{
  "rut": "11111111-1"
}
```

Response 200:

```json
{
  "isPep": false
}
```

### Validation 400 error example

```json
{
  "message": [
    "rut must contain only digits, k, or hyphen",
    "birthDate must be in the format yyyy-MM-dd"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). The production environment is available at:

`https://ms-gesintel.vercel.app`

To deploy your own instance, connect the repository to Vercel and configure the environment variables as needed.

## Stay in touch

- Author - [Byron Villegas Moya](https://github.com/byron-villegas)
- Repository - [https://github.com/byron-villegas/ms-gesintel](https://github.com/byron-villegas/ms-gesintel)
- Email - byronvillegasm@gmail.com

## License

This project is [MIT licensed](https://github.com/byron-villegas/ms-gesintel/blob/main/LICENSE).
