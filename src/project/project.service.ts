import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async createProject(
    { name }: CreateProjectDto,
    OwnerId: number,
  ): Promise<Project> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: OwnerId,
      },
    });
    return await this.prismaService.project.create({
      data: {
        name,
        OwnerId,
        User: {
          connect: user,
        },
      },
    });
  }

  async deleteProject(id: string): Promise<Project> {
    return await this.prismaService.project.delete({
      where: {
        id,
      },
    });
  }

  async changeProjectName(id: string, name: string): Promise<Project> {
    return await this.prismaService.project.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
  }

  async addUsers(
    projectId: string,
    userId: number,
    ownerId: number,
  ): Promise<Project> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    return await this.prismaService.project.update({
      data: {
        User: {
          connect: user,
        },
      },
      where: {
        id: projectId,
        OwnerId: ownerId,
      },
    });
  }

  async removeUsers(
    projectId: string,
    userId: number,
    ownerId: number,
  ): Promise<Project> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    return await this.prismaService.project.update({
      data: {
        User: {
          disconnect: user,
        },
      },
      where: {
        id: projectId,
        OwnerId: ownerId,
      },
    });
  }

  async getProjectsPerUser(userId: number) {
    return this.prismaService.project.findMany({
      where: {
        User: {
          some: {
            id: userId,
          },
        },
      },
    });
  }
}
