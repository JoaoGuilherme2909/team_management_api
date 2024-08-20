import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }
}
