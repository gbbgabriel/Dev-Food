import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '@src/decorators/roles.decorator';
import { UserType } from '@src/user/enum/user-type.enum';
import { CartEntity } from './entities/cart.entity';
import { InsertCart } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from '@src/decorators/userId.decorator';

@Roles(UserType.Admin, UserType.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async insertCart(
    @Body() insertCart: InsertCart,
    @UserId() userId: number,
  ): Promise<CartEntity> {
    return await this.cartService.insertProductCart(userId);
  }
}
