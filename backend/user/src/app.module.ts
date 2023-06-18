import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { HttpModule } from '@infra/http/controllers/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@application/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => HttpModule),
    forwardRef(() => AuthModule),
    DatabaseModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
