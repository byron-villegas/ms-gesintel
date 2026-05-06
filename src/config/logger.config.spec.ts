import {
  buildPinoHttpOptions,
  customHttpLogLevel,
  getPinoHttpLevel,
  getPinoHttpTransport,
} from './logger.config';

describe('logger config', () => {
  it('should return info log level in production and debug otherwise', () => {
    expect(getPinoHttpLevel('production')).toBe('info');
    expect(getPinoHttpLevel('development')).toBe('debug');
    expect(getPinoHttpLevel(undefined)).toBe('debug');
  });

  it('should configure pretty transport outside production', () => {
    expect(getPinoHttpTransport('production')).toBeUndefined();

    expect(getPinoHttpTransport('development')).toEqual(
      expect.objectContaining({
        target: 'pino-pretty',
      }),
    );
  });

  it('should map response status and errors to expected log levels', () => {
    expect(customHttpLogLevel({}, { statusCode: 200 })).toBe('info');
    expect(customHttpLogLevel({}, { statusCode: 404 })).toBe('warn');
    expect(customHttpLogLevel({}, { statusCode: 500 })).toBe('error');
    expect(
      customHttpLogLevel({}, { statusCode: 200 }, new Error('boom')),
    ).toBe('error');
  });

  it('should build pino http options with expected defaults', () => {
    const options = buildPinoHttpOptions('development');

    expect(options.autoLogging).toBe(true);
    expect(options.redact.remove).toBe(true);
    expect(options.redact.paths).toEqual(
      expect.arrayContaining([
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.token',
      ]),
    );
    expect(options.level).toBe('debug');
    expect(options.transport).toEqual(
      expect.objectContaining({
        target: 'pino-pretty',
      }),
    );
  });
});
