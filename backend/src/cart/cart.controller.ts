import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '@src/decorators/roles.decorator';
import { UserType } from '@src/user/enum/user-type.enum';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from '@src/decorators/userId.decorator';
import { ReturnCartDTO } from './dtos/return-cart.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async InsertCartDTO(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.insertProductInCart(insertCart, userId),
    );
  }

  @UsePipes(ValidationPipe)
  @Get()
  async findCartByUserId(@UserId() userId: number): Promise<ReturnCartDTO> {
    return await this.cartService.findCartByUserId(userId, true);
  }

  @UsePipes(ValidationPipe)
  @Delete()
  async clearCart(@UserId() userId: number): Promise<boolean> {
    return await this.cartService.clearCart(userId);
  }
}
