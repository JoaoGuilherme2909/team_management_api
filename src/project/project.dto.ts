import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class AddUserDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  UserId: number;
}
