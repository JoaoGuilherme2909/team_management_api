import { Body, Controller, Post } from '@nestjs/common';
import { SignInUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async SignIn(@Body() user: SignInUserDto): Promise<any> {
    return await this.authService.signIn(user);
  }
}
