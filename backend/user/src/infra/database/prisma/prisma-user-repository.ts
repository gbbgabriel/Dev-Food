import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@application/entities/user.entity';
import { PrismaUserMapper } from '../helpers/prisma-user-mapper';
import { Email } from '@application/entities/email.entity copy';

@Injectable()
export class PrismaUserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.value },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(request: User): Promise<void> {
    const existingUser = await this.findByEmail(request.email);

    if (existingUser) {
      throw new Error('O endereço de e-mail já está em uso.');
    }

    const raw = PrismaUserMapper.toPrisma(request);

    await this.prisma.user.create({ data: raw });

    // const raw = PrismaUserMapper.toPrisma(request);
    // const hashedPassword = await this.authService.hashPassword(raw.password);
    // raw.password = hashedPassword;
    // await this.prisma.user.create({ data: raw });
  }

  async update(request: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(request);

    const user = await this.prisma.user.update({
      where: { id: raw.id },
      data: raw,
    });

    return PrismaUserMapper.toDomain(user);
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
