import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto): Promise<any> {
    const user = await this.userService.getUser(loginDto);
    const password = await bcrypt.hash(loginDto.password, 10);

    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: Partial<LoginDto>) {
    const user = await this.validateUser(loginDto);

    if (!user) { throw new Error('Invalid credentials'); }

    const payload = { email: user.email, id: user.id };
    user.token = this.jwtService.sign(payload);

    return user;
  }
}