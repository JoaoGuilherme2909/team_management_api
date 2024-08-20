import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(@Body() user: SignInUserDto): Promise<any> {
    const userExists = await this.userService.userNameAlreadyExists(
      user.username,
    );

    const isAuthorized = await argon.verify(userExists.hash, user.hash);

    if (!isAuthorized) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: userExists.id,
      email: userExists.email,
      username: userExists.username,
      hash: userExists.hash,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
