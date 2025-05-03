import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  
  app.enableCors({
    origin: [
      'http://127.0.0.1:5173',
      'https://workit-next-front.vercel.app',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://workit-backend-two.vercel.app',
    ],
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle('Workit API')
    .setDescription('The Workit API documentation')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('boards', 'Board management endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3030;
  
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
  console.log(`Swagger documentation is available at http://localhost:${port}/api`);
}
bootstrap();
