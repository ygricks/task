import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from './IUserPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ jwt: string; payload: IUserPayload }> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!this.usersService.validatePassword(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload: IUserPayload = {
      sub: user.id,
      username: user.name,
      email: user.email,
    };
    const jwt = await this.jwtService.signAsync(payload);
    return { jwt, payload };
  }
}
