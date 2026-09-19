import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.setGlobalPrefix(
    config.get<string>('API_PREFIX') ?? 'api/v1',
  );

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'https://friendly-silence-deny-trials.trycloudflare.com',
    'https://associated-whom-teach-returned.trycloudflare.com',
    'https://creative-elimination-alan-sandra.trycloudflare.com',
    'https://richmond-neck-derived-crucial.trycloudflare.com',
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGIN,
  ].filter((origin): origin is string => Boolean(origin));

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  });

  setupSwagger(app);

  const port = Number(process.env.PORT) || 5000;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 API running on port ${port}`);
}

bootstrap();