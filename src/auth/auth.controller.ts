import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

class LoginDto {
  username: string;
  password: string;
}

class SignupDto {
  username: string;
  password: string;
  fullname: string;
  imgUrl?: string;
}

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login', description: 'Authenticate user and return user details with JWT cookie' })
  @ApiBody({
    type: LoginDto,
    description: 'User credentials',
    examples: {
      example1: {
        value: {
          username: 'johndoe',
          password: 'password123'
        },
        summary: 'Login credentials example'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'User authenticated successfully' })
  @ApiResponse({ status: 401, description: 'Invalid username or password' })
  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) response: Response) {
    try {
      const { username, password } = body;
      const user = await this.authService.validateUser(username, password);
      const { access_token } = await this.authService.login(user);
      
      response.cookie('loginToken', access_token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Required for HTTPS
  sameSite: 'none', // Required for cross-site cookies
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7, // Optional: 7 days
});
      
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({ summary: 'Signup', description: 'Register a new user and return user details with JWT cookie' })
  @ApiBody({
    type: SignupDto,
    description: 'User registration details',
    examples: {
      example1: {
        value: {
          username: 'johndoe',
          password: 'password123',
          fullname: 'John Doe',
          imgUrl: 'https://example.com/avatar.jpg'
        },
        summary: 'Signup details example'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Username taken or missing details' })
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

  @ApiOperation({ summary: 'Logout', description: 'Logout user by clearing JWT cookie' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('loginToken');
    return { msg: 'Logged out successfully' };
  }
}
