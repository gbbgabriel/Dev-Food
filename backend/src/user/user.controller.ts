import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { Entity } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }
}
