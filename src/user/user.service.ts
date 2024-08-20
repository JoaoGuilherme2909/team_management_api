import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './user.dto';
import { User } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const hash = await argon.hash(user.hash);
    try {
      const userEmailAlreadyExists = await this.userEmailAlreadyExists(
        user.email,
      );

      const userNameAlreadyExists = await this.userNameAlreadyExists(
        user.username,
      );

      if (userEmailAlreadyExists) {
        throw new ConflictException('Email already used');
      }

      if (userNameAlreadyExists) {
        throw new ConflictException('Username already exists');
      }

      return this.prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          hash,
          name: user.name,
        },
      });
    } catch (ex) {
      throw ex;
    }
  }

  async userNameAlreadyExists(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async userEmailAlreadyExists(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
