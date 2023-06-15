import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUser } from '@application/use-cases/create-user';
import { DatabaseModule } from '@infra/database/database.module';
import { UpdateUser } from '@application/use-cases/update-user';
import { DeleteUser } from '@application/use-cases/delete-user';
import { PrismaUserRepository } from '@infra/database/prisma/prisma-user-repository';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ShowUser } from '@application/use-cases/show-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUser,
    UpdateUser,
    DeleteUser,
    ShowUser,
    JwtService,
    PrismaService,
    PrismaUserRepository,
  ],
  exports: [CreateUser, UpdateUser, DeleteUser, ShowUser],
})
export class HttpModule {}