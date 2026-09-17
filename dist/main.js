"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const transform_response_interceptor_1 = require("./common/interceptors/transform-response.interceptor");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.setGlobalPrefix('api/v1');
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
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new transform_response_interceptor_1.TransformResponseInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Bio-Identifier API')
        .setDescription('AI-Powered Biological Identification, Snake & Antivenom Directory, Crop Pest Diagnosis, and Emergency SOS Dispatch Platform')
        .setVersion('1.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT bearer token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Authentication', 'User registration, login, and profile access')
        .addTag('Snakes & Antivenom', 'Encyclopedia of venomous and non-venomous snakes with clinical first aid')
        .addTag('Pests & Crop Remedies', 'Agricultural pest diagnosis, remedies, and chemical dosage calculator')
        .addTag('Emergency Antivenom Hospitals', 'GPS locator and hotline directory of antivenom facilities')
        .addTag('AI Specimen Identification', 'Gemini Vision AI species identification engine')
        .addTag('Emergency Hotline & SOS Dispatch', 'Real-time SOS logging and 24/7 hotline directory')
        .addTag('Users Management', 'User profile management and role administration')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'Bio-Identifier API Documentation',
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = process.env.PORT || 5001;
    await app.listen(port);
    logger.log(`🚀 Bio-Identifier Backend running on: http://localhost:${port}/api/v1`);
    logger.log(`📑 Swagger Documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map