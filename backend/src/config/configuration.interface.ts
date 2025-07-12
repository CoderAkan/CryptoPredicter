export interface Configuration {
    port: number;
    environment: string;
    database: {
      url: string;
      host: string;
      port: number;
      username: string;
      password: string;
      name: string;
    };
    jwt: {
      secret: string;
      expiresIn: string;
    };
    redis: {
      host: string;
      port: number;
      password?: string;
    };
    api: {
      prefix: string;
      version: string;
      rateLimitTtl: number;
      rateLimitMax: number;
    };
    external: {
      priceApiUrl: string;
      priceApiKey?: string;
    };
    upload: {
      maxFileSize: number;
      allowedTypes: string[];
      uploadPath: string;
    };
    cors: {
      origin: string;
      credentials: boolean;
    };
    logging: {
      level: string;
      enableConsole: boolean;
    };
  }