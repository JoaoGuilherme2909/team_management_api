import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
      const userCreated = await this.prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          hash,
          name: user.name,
        },
      });
      delete userCreated.hash;
      return userCreated;
    } catch (ex) {
      throw ex;
    }
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async changePassword(id: number, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    const isHashCorrect = argon.verify(user.hash, oldPassword);

    if (isHashCorrect) {
      const hash = await argon.hash(newPassword);
      const userUpdated = await this.prisma.user.update({
        data: {
          hash,
        },
        where: {
          id,
        },
      });

      delete userUpdated.hash;
      return userUpdated;
    } else {
      throw new UnauthorizedException('Senha antiga incorreta');
    }
  }

  async userNameAlreadyExists(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }

  async userEmailAlreadyExists(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
