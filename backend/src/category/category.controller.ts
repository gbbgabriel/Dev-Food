import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategory } from './dtos/return-category.dto';
import { CreateCategory } from './dtos/create-category.dto';
import { UserType } from '@src/user/enum/user-type.enum';
import { Roles } from '@src/decorators/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategory(category),
    );
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<ReturnCategory> {
    return new ReturnCategory(
      await this.categoryService.createCategory(createCategory),
    );
  }
}
