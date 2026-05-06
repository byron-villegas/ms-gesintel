describe('main bootstrap', () => {
  const originalPort = process.env.PORT;

  afterEach(() => {
    process.env.PORT = originalPort;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should configure swagger and start app using PORT env var', async () => {
    const mockApp = {
      setGlobalPrefix: jest.fn(),
      useGlobalPipes: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
    };

    const createMock = jest.fn().mockResolvedValue(mockApp);
    const createDocumentMock = jest.fn().mockReturnValue({
      openapi: '3.0.0',
    });
    const setupMock = jest.fn();

    class MockDocumentBuilder {
      setTitle(): this {
        return this;
      }

      setDescription(): this {
        return this;
      }

      setVersion(): this {
        return this;
      }

      setContact(): this {
        return this;
      }

      setLicense(): this {
        return this;
      }

      addServer(): this {
        return this;
      }

      addTag(): this {
        return this;
      }

      build(): Record<string, never> {
        return {};
      }
    }

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
      DocumentBuilder: MockDocumentBuilder,
      SwaggerModule: {
        createDocument: createDocumentMock,
        setup: setupMock,
      },
    }));

    jest.isolateModules(() => {
      require('./main');
    });
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('ms-gesintel');
    expect(mockApp.useGlobalPipes).toHaveBeenCalledTimes(1);
    expect(createDocumentMock).toHaveBeenCalledTimes(1);
    expect(setupMock).toHaveBeenCalledWith(
      'swagger-ui/index.html',
      mockApp,
      expect.any(Object),
      expect.objectContaining({
        useGlobalPrefix: true,
      }),
    );
    expect(mockApp.listen).toHaveBeenCalledWith('4321');
  });

  it('should use port 3000 when PORT is undefined', async () => {
    const mockApp = {
      setGlobalPrefix: jest.fn(),
      useGlobalPipes: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
    };

    class MockDocumentBuilder {
      setTitle(): this {
        return this;
      }

      setDescription(): this {
        return this;
      }

      setVersion(): this {
        return this;
      }

      setContact(): this {
        return this;
      }

      setLicense(): this {
        return this;
      }

      addServer(): this {
        return this;
      }

      addTag(): this {
        return this;
      }

      build(): Record<string, never> {
        return {};
      }
    }

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
      DocumentBuilder: MockDocumentBuilder,
      SwaggerModule: {
        createDocument: jest.fn().mockReturnValue({ openapi: '3.0.0' }),
        setup: jest.fn(),
      },
    }));

    jest.isolateModules(() => {
      require('./main');
    });
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(mockApp.listen).toHaveBeenCalledWith(3000);
  });
});
