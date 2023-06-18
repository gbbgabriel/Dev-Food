import {
  Controller,
  Post,
  Body,
  Query,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { AuthForgotPasswordDTO } from './dto/auth.forgot-password.dto';
import { AuthResetPasswordDTO } from './dto/auth.reset-password.dto';
import { CreateUser } from '@application/use-cases/create-user';
import { Email } from '@application/entities/email.entity copy';
import { User } from '@application/decorators/user-decorator';
import { UserViewModel } from '@infra/http/view-models/user-view-model';
import { AuthGuard } from '@application/guards/auth-guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly createUser: CreateUser,
  ) {}

  @Post('login')
  async login(@Body() loginDTO: AuthLoginDTO) {
    return this.authService.login(new Email(loginDTO.email), loginDTO.password);
  }

  @Post('register')
  async register(@Body() registerDTO: AuthRegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDTO: AuthForgotPasswordDTO) {
    return this.authService.forgotPassword(new Email(forgotPasswordDTO.email));
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDTO: AuthResetPasswordDTO) {
    return this.authService.resetPassword(
      resetPasswordDTO.password,
      resetPasswordDTO.token,
    );
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() request) {
    const { user } = request;
    return UserViewModel.toHTTP(user);
  }
}
