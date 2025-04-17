import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }
    
    const userObject = user.toJSON ? user.toJSON() : user;
    const { password: _, ...result } = userObject;
    return result;
  }

  async login(user: any) {
    const payload = { sub: user._id, username: user.username, fullname: user.fullname };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async signup(username: string, password: string, fullname: string, imgUrl: string) {
    if (!username || !password || !fullname) {
      throw new UnauthorizedException('Missing details');
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    return this.userService.create({
      username,
      password: hashedPassword,
      fullname,
      imgUrl,
    });
  }
}
