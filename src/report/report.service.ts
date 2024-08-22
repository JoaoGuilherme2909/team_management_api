import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prismaService: PrismaService) {}

  async generateReport(ownerId: number, projectId: string) {
    return this.prismaService.project.findUnique({
      include: {
        Tasks: {
          select: {
            title: true,
            content: true,
            status: true,
            User: {
              select: {
                name: true,
                email: true,
                username: true,
              },
            },
          },
        },
      },
      where: {
        OwnerId: ownerId,
        id: projectId,
      },
    });
  }
}
