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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@ApiBearerAuth()
@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get('/:projectId')
  @ApiOperation({ summary: 'get all tasks from a user' })
  @ApiParam({
    name: 'projectId',
    required: true,
    schema: { type: 'string' },
  })
  async getAllTasksFromUser(@Req() req, @Param('projectId') projectId: string) {
    return await this.taskService.getAllTasksFromUser(req.user.sub, projectId);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  async createTask(@Body() task: CreateTaskDto, @Req() req) {
    return await this.taskService.createTask(task, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'get all avaliable status' })
  async getStatus() {
    return await this.taskService.getStatus();
  }

  @UseGuards(AuthGuard)
  @Put('user/:userId')
  @ApiOperation({ summary: 'Change user related to the task' })
  @ApiParam({
    name: 'userId',
    required: true,
    schema: { type: 'int' },
  })
  async changeUserRelated(
    @Body() task: UpdateTaskDto,
    @Param('userId') userId: string,
    @Req() req,
  ) {
    return await this.taskService.changeUserRelated(
      task,
      Number.parseInt(userId),
      req.user.sub,
    );
  }

  @UseGuards(AuthGuard)
  @Put('title/:title')
  @ApiOperation({ summary: 'Change task title' })
  @ApiParam({
    name: 'title',
    required: true,
    schema: { type: 'string' },
  })
  async changeTaskTitle(
    @Body() task: UpdateTaskDto,
    @Param('title') title: string,
    @Req() req,
  ) {
    return await this.taskService.changeTaskTitle(task, title, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Put('content/:content')
  @ApiOperation({ summary: 'Change task content' })
  @ApiParam({
    name: 'content',
    required: true,
    schema: { type: 'string' },
  })
  async changeTaskContent(
    @Body() task: UpdateTaskDto,
    @Param('content') content: string,
    @Req() req,
  ) {
    return await this.taskService.changeTaskContent(
      task,
      content,
      req.user.sub,
    );
  }

  @UseGuards(AuthGuard)
  @Put('status/:statusId')
  @ApiOperation({ summary: 'Change task status' })
  @ApiParam({
    name: 'statusId',
    required: true,
    schema: { type: 'int' },
  })
  async changeTaskStatus(
    @Body() task: UpdateTaskDto,
    @Param('statusId') statusId: string,
    @Req() req,
  ) {
    return await this.taskService.changeTaskStatus(
      task,
      Number.parseInt(statusId),
      req.user.sub,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:projectId/:taskId')
  @ApiOperation({ summary: 'delete task' })
  @ApiParam({
    name: 'taskId',
    required: true,
    schema: { type: 'int' },
  })
  async deleteTask(
    @Req() req,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.taskService.deleteTask(
      {
        ownerId: req.user.sub,
        projectId: projectId,
      },
      Number.parseInt(taskId),
    );
  }
}
