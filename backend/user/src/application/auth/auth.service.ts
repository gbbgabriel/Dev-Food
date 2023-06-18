import { Email } from '@application/entities/email.entity copy';
import { User } from '@application/entities/user.entity';
import { UserRepository } from '@application/repositories/user-repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { CreateUser } from '@application/use-cases/create-user';
import { Token } from 'typescript';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly createUser: CreateUser,
  ) {}

  async generateToken(user: User): Promise<string> {
    return this.JWTService.signAsync(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1d',
        subject: String(user.id),
        issuer: 'login',
        audience: 'users',
      },
    );
  }

  async checkToken(token: string): Promise<any> {
    try {
      const data = this.JWTService.verify(token, {
        audience: 'users',
      });

      return data;
    } catch (error) {
      throw new BadRequestException('Token inválido.');
    }
  }

  async isTokenValid(token: string): Promise<boolean> {
    try {
      await this.checkToken(token);

      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: Email, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('E-mail ou senha inválido.');
    }

    if (password != user.password) {
      throw new Error('E-mail ou senha inválido.');
    }
    return this.generateToken(user);
  }

  async register(body: AuthRegisterDTO): Promise<any> {
    // const payload = {
    //   sub: user.id,
    //   username: user.username,
    //   email: user.email,
    // };
    // return {
    //   user,
    //   token: await this.generateToken(payload),
    // };

    const { name, email, password } = body;

    const { user } = await this.createUser.execute({ name, email, password });

    return this.generateToken(user);
  }

  async forgotPassword(email: Email) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('E-mail não encontrado.');
    }

    return {
      user,
    };
  }

  async resetPassword(password: string, token: string) {
    const decoded = 'sd';
    // const decoded = await this.decodeToken(token);

    // if (!decoded) {
    //   throw new Error('Token inválido.');
    // }

    const user = await this.userRepository.findById(decoded);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    user.password = password ?? user.password;

    await this.userRepository.update(user);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return this.generateToken(user);
  }
}
