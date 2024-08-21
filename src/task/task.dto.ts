import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @ApiProperty()
  UserId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  ProjectId: string;

  @IsNotEmpty()
  @ApiProperty()
  StatusId: number;
}

export class UpdateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  taskId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}

export class deleteTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  ownerId: number;
}
