type MinimalResponse = {
  statusCode: number;
};

export function customHttpLogLevel(
  _req: unknown,
  res: MinimalResponse,
  err?: Error,
): 'error' | 'warn' | 'info' {
  if (err || res.statusCode >= 500) {
    return 'error';
  }

  if (res.statusCode >= 400) {
    return 'warn';
  }

  return 'info';
}

export function getPinoHttpTransport(nodeEnv = process.env.NODE_ENV) {
  return nodeEnv !== 'production'
    ? {
        target: 'pino-pretty',
        options: {
          singleLine: true,
          colorize: true,
          translateTime: 'SYS:standard',
        },
      }
    : undefined;
}

export function getPinoHttpLevel(nodeEnv = process.env.NODE_ENV) {
  return nodeEnv === 'production' ? 'info' : 'debug';
}

export function buildPinoHttpOptions(nodeEnv = process.env.NODE_ENV) {
  return {
    level: getPinoHttpLevel(nodeEnv),
    autoLogging: true,
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.token',
      ],
      remove: true,
    },
    customLogLevel: customHttpLogLevel,
    transport: getPinoHttpTransport(nodeEnv),
  };
}
