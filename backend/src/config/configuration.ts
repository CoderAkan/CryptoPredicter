export default () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    environment: process.env.NODE_ENV || 'development',
    
    database: {
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME || 'myapp',
    },
    
    jwt: {
      secret: process.env.JWT_SECRET || 'your-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
      password: process.env.REDIS_PASSWORD,
    },
    
    api: {
      prefix: process.env.API_PREFIX || 'api',
      version: process.env.API_VERSION || 'v1',
      rateLimitTtl: process.env.RATE_LIMIT_TTL ? parseInt(process.env.RATE_LIMIT_TTL, 10) : 60,
      rateLimitMax: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX, 10) : 100,
    },
    
    external: {
      priceApiUrl: process.env.PRICE_API_URL || 'https://api.example.com',
      priceApiKey: process.env.PRICE_API_KEY,
    },
    
    upload: {
      maxFileSize: process.env.MAX_FILE_SIZE ? parseInt(process.env.MAX_FILE_SIZE, 10) : 5 * 1024 * 1024, // 5MB
      allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(',') || ['image/jpeg', 'image/png'],
      uploadPath: process.env.UPLOAD_PATH || './uploads',
    },
    
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: process.env.CORS_CREDENTIALS === 'true',
    },
    
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      enableConsole: process.env.LOG_CONSOLE !== 'false',
    },
  });