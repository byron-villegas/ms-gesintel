describe('main bootstrap', () => {
  const originalPort = process.env.PORT;

  afterEach(() => {
    process.env.PORT = originalPort;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should configure swagger and start app using PORT env var', async () => {
    const mockLogger = { log: jest.fn() };
    const mockApp = {
      setGlobalPrefix: jest.fn(),
      useGlobalPipes: jest.fn(),
      useLogger: jest.fn(),
      get: jest.fn().mockReturnValue(mockLogger),
      listen: jest.fn().mockResolvedValue(undefined),
    };

    const createMock = jest.fn().mockResolvedValue(mockApp);
    const createDocumentMock = jest.fn().mockReturnValue({
      openapi: '3.0.0',
    });
    const setupMock = jest.fn();
    const buildSwaggerConfigMock = jest.fn().mockReturnValue({
      openapi: '3.0.0',
    });

    process.env.PORT = '4321';

    jest.doMock('./app.module', () => ({
      AppModule: class MockAppModule {},
    }));

    jest.doMock('@nestjs/core', () => ({
      NestFactory: {
        create: createMock,
      },
    }));

    jest.doMock('@nestjs/swagger', () => ({
      SwaggerModule: {
        createDocument: createDocumentMock,
        setup: setupMock,
      },
    }));

    jest.doMock('./config/swagger.config', () => ({
      buildSwaggerConfig: buildSwaggerConfigMock,
    }));

    jest.isolateModules(() => {
      require('./main');
    });
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith(expect.any(Function), {
      bufferLogs: true,
    });
    expect(mockApp.get).toHaveBeenCalledTimes(1);
    expect(mockApp.useLogger).toHaveBeenCalledWith(mockLogger);
    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('api');
    expect(mockApp.useGlobalPipes).toHaveBeenCalledTimes(1);
    expect(buildSwaggerConfigMock).toHaveBeenCalledTimes(1);
    expect(createDocumentMock).toHaveBeenCalledTimes(1);
    expect(setupMock).toHaveBeenCalledWith(
      'swagger-ui',
      mockApp,
      expect.any(Object),
      expect.objectContaining({
        useGlobalPrefix: true,
      }),
    );
    expect(mockApp.listen).toHaveBeenCalledWith('4321');
  });

  it('should use port 3000 when PORT is undefined', async () => {
    const mockLogger = { log: jest.fn() };
    const mockApp = {
      setGlobalPrefix: jest.fn(),
      useGlobalPipes: jest.fn(),
      useLogger: jest.fn(),
      get: jest.fn().mockReturnValue(mockLogger),
      listen: jest.fn().mockResolvedValue(undefined),
    };

    const buildSwaggerConfigMock = jest.fn().mockReturnValue({
      openapi: '3.0.0',
    });

    delete process.env.PORT;

    jest.doMock('./app.module', () => ({
      AppModule: class MockAppModule {},
    }));

    jest.doMock('@nestjs/core', () => ({
      NestFactory: {
        create: jest.fn().mockResolvedValue(mockApp),
      },
    }));

    jest.doMock('@nestjs/swagger', () => ({
      SwaggerModule: {
        createDocument: jest.fn().mockReturnValue({ openapi: '3.0.0' }),
        setup: jest.fn(),
      },
    }));

    jest.doMock('./config/swagger.config', () => ({
      buildSwaggerConfig: buildSwaggerConfigMock,
    }));

    jest.isolateModules(() => {
      require('./main');
    });
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(mockApp.useLogger).toHaveBeenCalledWith(mockLogger);
    expect(buildSwaggerConfigMock).toHaveBeenCalledTimes(1);
    expect(mockApp.listen).toHaveBeenCalledWith(3000);
  });
});
