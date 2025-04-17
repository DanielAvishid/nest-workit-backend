import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) response: Response) {
    try {
      const { username, password } = body;
      const user = await this.authService.validateUser(username, password);
      const { access_token } = await this.authService.login(user);
      
      response.cookie('loginToken', access_token, {
        httpOnly: true,
      });
      
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('signup')
  async signup(@Body() body: any, @Res({ passthrough: true }) response: Response) {
    try {
      const { username, password, fullname, imgUrl } = body;
      await this.authService.signup(username, password, fullname, imgUrl);
      
      const user = await this.authService.validateUser(username, password);
      const { access_token } = await this.authService.login(user);
      
      response.cookie('loginToken', access_token, {
        httpOnly: true,
      });
      
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('loginToken');
    return { msg: 'Logged out successfully' };
  }
}
