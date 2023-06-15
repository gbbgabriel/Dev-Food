import { CreateUserDTO } from '@application/dto/create-user.dto';
import { CreateUser } from '@application/use-cases/create-user';
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { UserViewModel } from '../view-models/user-view-model';
import { UpdateUserDTO } from '@application/dto/update-user.dto';
import { UpdateUser } from '@application/use-cases/update-user';
import { DeleteUser } from '@application/use-cases/delete-user';
import { ShowUser } from '@application/use-cases/show-user';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly showUser: ShowUser,
  ) {}

  @Post()
  async create(@Body() createUserDTo: CreateUserDTO) {
    const { name, email, password } = createUserDTo;

    const { user } = await this.createUser.execute({ name, email, password });

    return UserViewModel.toHTTP(user);
  }

  @Patch()
  async update(
    @Query('id', new ParseUUIDPipe()) userId: string,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    const { name, email, password } = updateUserDto;

    const { user } = await this.updateUser.execute({
      userId,
      name,
      email,
      password,
    });

    return UserViewModel.toHTTP(user);
  }

  @Delete()
  async delete(@Query('id', new ParseUUIDPipe()) userId: string) {
    console.log(userId);
    await this.deleteUser.execute(userId);
  }

  @Get('show')
  async findById(@Query('id', new ParseUUIDPipe()) userId: string) {
    const { user } = await this.showUser.execute(userId);

    return UserViewModel.toHTTP(user);
  }
}
