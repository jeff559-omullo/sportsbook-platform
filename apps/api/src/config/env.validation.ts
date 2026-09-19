import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(
      'development',
      'production',
      'test',
    )
    .default('development'),

  PORT: Joi.number().default(5000),

  API_PREFIX: Joi.string().default(
    'api/v1',
  ),

  APP_NAME: Joi.string().required(),

  APP_VERSION: Joi.string().required(),

  MONGO_URI: Joi.string().required(),

  JWT_SECRET: Joi.string()
    .min(16)
    .required(),

  JWT_REFRESH_SECRET: Joi.string()
    .min(16)
    .required(),

  REDIS_HOST: Joi.string().required(),

  REDIS_PORT: Joi.number().required(),

  MEGAPAY_API_KEY: Joi.string().required(),

  MEGAPAY_EMAIL: Joi.string()
    .email()
    .required(),

  MEGAPAY_BASE_URL: Joi.string()
    .uri()
    .required(),

  MEGAPAY_TIMEOUT_MS: Joi.number()
    .min(1000)
    .max(30000)
    .default(10000),
});