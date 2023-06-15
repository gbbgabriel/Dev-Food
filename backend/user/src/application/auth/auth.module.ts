import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { HttpModule } from '@infra/http/controllers/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthService } from './auth.service';
import { ShowUser } from '@application/use-cases/show-user';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ShowUser],
})
export class AuthModule {}
