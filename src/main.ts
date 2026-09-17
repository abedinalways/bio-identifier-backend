import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Global Route Prefix
  app.setGlobalPrefix('api/v1');

  // Cross-Origin Resource Sharing (CORS)
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
      ];

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Client-Platform',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Global Filters & Interceptors
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformResponseInterceptor(),
  );

  // OpenAPI / Swagger Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bio-Identifier API')
    .setDescription(
      'AI-Powered Biological Identification, Snake & Antivenom Directory, Crop Pest Diagnosis, and Emergency SOS Dispatch Platform',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT bearer token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'User registration, login, and profile access')
    .addTag(
      'Snakes & Antivenom',
      'Encyclopedia of venomous and non-venomous snakes with clinical first aid',
    )
    .addTag(
      'Pests & Crop Remedies',
      'Agricultural pest diagnosis, remedies, and chemical dosage calculator',
    )
    .addTag(
      'Emergency Antivenom Hospitals',
      'GPS locator and hotline directory of antivenom facilities',
    )
    .addTag(
      'AI Specimen Identification',
      'Gemini Vision AI species identification engine',
    )
    .addTag(
      'Emergency Hotline & SOS Dispatch',
      'Real-time SOS logging and 24/7 hotline directory',
    )
    .addTag(
      'Users Management',
      'User profile management and role administration',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Bio-Identifier API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 5001;
  await app.listen(port);

  logger.log(
    `🚀 Bio-Identifier Backend running on: http://localhost:${port}/api/v1`,
  );
  logger.log(
    `📑 Swagger Documentation available at: http://localhost:${port}/api/docs`,
  );
}

bootstrap();
