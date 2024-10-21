import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Md5 } from 'ts-md5';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto): Promise<any> {
    const user = await this.userService.getUser(loginDto);

    if (user && Md5.hashStr(loginDto.password) === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: Partial<LoginDto>) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}