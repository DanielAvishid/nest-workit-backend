import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  
  app.enableCors({
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://workit-backend-two.vercel.app',
    ],
    credentials: true,
  });
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3030;
  
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();
