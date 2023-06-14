import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@application/repositories/user-repositories';
import { PrismaUserRepository } from './prisma/prisma-user-repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    JwtService,
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
