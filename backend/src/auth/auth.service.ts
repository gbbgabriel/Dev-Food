import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '@src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '@src/user/user.service';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { ReturnUserDto } from '@src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '@src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTo: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService.findUserByEmail(
      loginDTo.email,
    );

    const isPasswordValid = await comparePassword(
      loginDTo.password,
      user?.password || '',
    );

    if (!user || !isPasswordValid) {
      throw new BadRequestException('Email or password invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
