export default () => ({
  app: {
    name: process.env.APP_NAME || 'Sportsbook API',
    version: process.env.APP_VERSION || '1.0.0',
    port: parseInt(process.env.PORT || '5000', 10),
    apiPrefix: process.env.API_PREFIX || 'api/v1',
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  database: {
    uri: process.env.MONGO_URI || '',
  },

  jwt: {
    secret: process.env.JWT_SECRET || '',
    refreshSecret: process.env.JWT_REFRESH_SECRET || '',
    accessExpiresIn:
      process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(
      process.env.REDIS_PORT || '6379',
      10,
    ),
  },

  payments: {
    megapay: {
      apiKey:
        process.env.MEGAPAY_API_KEY || '',
      email:
        process.env.MEGAPAY_EMAIL || '',
      baseUrl:
        process.env.MEGAPAY_BASE_URL || '',
      timeoutMs:
        Number(
          process.env.MEGAPAY_TIMEOUT_MS ||
            10000,
        ),
    },
  },
});