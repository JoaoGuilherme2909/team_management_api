import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { changePasswordDto, CreateUserDto } from './user.dto';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'register a user' })
  @Post()
  async register(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'get user by username' })
  @Get('/:username')
  @ApiParam({
    name: 'username',
    required: true,
    schema: { type: 'string' },
  })
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userService.userNameAlreadyExists(username);
    delete user.hash;
    return user;
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'delete an user' })
  @Delete()
  async deleteUser(@Req() req): Promise<User> {
    const user = await this.userService.deleteUser(req.user.sub);
    delete user.hash;
    return user;
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'change password of an user' })
  @Put()
  async changeUserPassword(
    @Req() req,
    @Body() { oldPassword, newPassword }: changePasswordDto,
  ): Promise<User> {
    return this.userService.changePassword(
      req.user.sub,
      oldPassword,
      newPassword,
    );
  }
}
