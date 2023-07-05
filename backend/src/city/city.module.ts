import { Module } from '@nestjs/common';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
