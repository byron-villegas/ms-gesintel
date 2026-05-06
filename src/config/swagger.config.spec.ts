import { buildSwaggerConfig } from './swagger.config';

describe('swagger config', () => {
  it('should build swagger document metadata with expected values', () => {
    const config = buildSwaggerConfig();

    expect(config.info.title).toBe('MS Gesintel API');
    expect(config.info.description).toBe(
      'Gesintel Microservice API for party screening and health checks',
    );
    expect(config.info.version).toBe('1.0.0');
    expect(config.info.contact).toEqual(
      expect.objectContaining({
        name: 'Byron Villegas Moya',
        url: 'https://github.com/byron-villegas/ms-gesintel',
        email: 'byronvillegasm@gmail.com',
      }),
    );
    expect(config.info.license).toEqual(
      expect.objectContaining({
        name: 'MIT',
        url: 'https://github.com/byron-villegas/ms-gesintel/blob/main/LICENSE',
      }),
    );
  });

  it('should include servers and tags used by swagger ui', () => {
    const config = buildSwaggerConfig();

    expect(config.servers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'http://localhost:3000',
          description: 'Local Development Server',
        }),
        expect.objectContaining({
          url: 'https://ms-gesintel.vercel.app',
          description: 'Vercel Production',
        }),
      ]),
    );
    expect(config.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Party Screening',
          description: 'Endpoints for OFAC and PEP validations',
        }),
      ]),
    );
  });
});