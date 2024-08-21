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
import { Project } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddUserDto, CreateProjectDto } from './project.dto';
import { ProjectService } from './project.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a project' })
  @Post()
  async createProject(
    @Req() req,
    @Body() project: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.createProject(project, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get projects that a user is part of' })
  @Get()
  async getProjectsPerUser(@Req() req) {
    return await this.projectService.getProjectsPerUser(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'delete project' })
  @Delete('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'int' },
  })
  async deleteProject(@Param('id') id: string) {
    return await this.projectService.deleteProject(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Add an user to a project' })
  @Put('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
  })
  async addUsers(
    @Req() req,
    @Param('id') ProjectId: string,
    @Body() { UserId }: AddUserDto,
  ) {
    return await this.projectService.addUsers(ProjectId, UserId, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Remove an user from a project' })
  @Put('/remove/:id')
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
  })
  async removeUsers(
    @Req() req,
    @Param('id') ProjectId: string,
    @Body() { UserId }: AddUserDto,
  ) {
    return await this.projectService.removeUsers(
      ProjectId,
      UserId,
      req.user.sub,
    );
  }
}
