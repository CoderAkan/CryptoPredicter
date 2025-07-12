import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  PRICE_API_KEY: Joi.string().required(),
  MAX_FILE_SIZE: Joi.number().default(5242880), // 5 242 880 bytes (B) = 5MB = 5 * 1024 * 1024
});