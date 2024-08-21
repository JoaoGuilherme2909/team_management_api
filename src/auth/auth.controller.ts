import { Body, Controller, Post } from '@nestjs/common';
import { SignInUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({})
  async SignIn(@Body() user: SignInUserDto): Promise<any> {
    return await this.authService.signIn(user);
  }
}
