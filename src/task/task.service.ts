import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, deleteTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async getAllTasksFromUser(userId: number, projectId: string) {
    return await this.prismaService.task.findMany({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });
  }

  async createTask(task: CreateTaskDto, ownerId: number) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: task.ProjectId,
      },
    });

    if (project !== null || project !== undefined) {
      if (project.OwnerId === ownerId) {
        return await this.prismaService.task.create({
          data: {
            title: task.title,
            content: task.content,
            projectId: task.ProjectId,
            statusId: task.StatusId,
            userId: task.UserId,
          },
        });
      }
      throw new UnauthorizedException(
        'User unauthorized to create tasks to this project',
      );
    }

    throw new NotFoundException('Project not Found');
  }

  async getStatus() {
    return await this.prismaService.status.findMany();
  }

  async changeUserRelated(
    task: UpdateTaskDto,
    newUserId: number,
    ownerId: number,
  ) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: task.projectId,
      },
    });

    if (project !== null || project !== undefined) {
      if (project.OwnerId === ownerId) {
        return await this.prismaService.task.update({
          data: {
            userId: newUserId,
          },
          where: {
            id: task.taskId,
            projectId: task.projectId,
            Project: {
              OwnerId: ownerId,
            },
          },
        });
      }
      throw new UnauthorizedException(
        'User unauthorized to create tasks to this project',
      );
    }

    throw new NotFoundException('Project not Found');
  }

  async changeTaskTitle(
    task: UpdateTaskDto,
    newTitle: string,
    ownerId: number,
  ) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: task.projectId,
      },
    });

    if (project !== null || project !== undefined) {
      if (project.OwnerId === ownerId) {
        return await this.prismaService.task.update({
          data: {
            title: newTitle,
          },
          where: {
            id: task.taskId,
            projectId: task.projectId,
            Project: {
              OwnerId: ownerId,
            },
          },
        });
      }
      throw new UnauthorizedException(
        'User unauthorized to create tasks to this project',
      );
    }

    throw new NotFoundException('Project not Found');
  }

  async changeTaskContent(
    task: UpdateTaskDto,
    newContent: string,
    ownerId: number,
  ) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: task.projectId,
      },
    });

    if (project !== null || project !== undefined) {
      if (project.OwnerId === ownerId) {
        return await this.prismaService.task.update({
          data: {
            content: newContent,
          },
          where: {
            id: task.taskId,
            projectId: task.projectId,
            Project: {
              OwnerId: ownerId,
            },
          },
        });
      }
      throw new UnauthorizedException(
        'User unauthorized to create tasks to this project',
      );
    }

    throw new NotFoundException('Project not Found');
  }

  async changeTaskStatus(
    task: UpdateTaskDto,
    newStatusId: number,
    ownerId: number,
  ) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: task.projectId,
      },
    });

    if (project !== null || project !== undefined) {
      if (project.OwnerId === ownerId) {
        return await this.prismaService.task.update({
          data: {
            statusId: newStatusId,
          },
          where: {
            id: task.taskId,
            projectId: task.projectId,
            Project: {
              OwnerId: ownerId,
            },
          },
        });
      }
      throw new UnauthorizedException(
        'User unauthorized to create tasks to this project',
      );
    }

    throw new NotFoundException('Project not Found');
  }

  async deleteTask(task: deleteTaskDto, taskId: number) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: task.projectId,
      },
    });

    if (project !== undefined || project !== null) {
      if (project.OwnerId === task.ownerId) {
        return await this.prismaService.task.delete({
          where: {
            Project: {
              OwnerId: task.ownerId,
            },
            id: taskId,
            projectId: task.projectId,
          },
        });
      }
      throw new UnauthorizedException(
        'User unauthorized to create tasks to this project',
      );
    }

    throw new NotFoundException('Project not Found');
  }
}
