import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDTo: LoginDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDTo.email)
      .catch(() => undefined);

    const isPasswordValid = await compare(
      loginDTo.password,
      user?.password || '',
    );

    if (!user || !isPasswordValid) {
      throw new NotFoundException('Email or password invalid');
    }

    return user;
  }
}
