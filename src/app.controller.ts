import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return {
      message: 'Workit Backend API',
      version: '1.0.0',
      endpoints: [
        '/api/auth/login',
        '/api/auth/signup',
        '/api/auth/logout',
        '/api/user',
        '/api/board'
      ]
    };
  }
}
