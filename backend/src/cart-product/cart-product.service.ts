import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { Repository } from 'typeorm';
import { ProductService } from '@src/product/product.service';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInCart(
    cartId: number,
    productId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: { cartId, productId },
    });

    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }

    return cartProduct;
  }

  async createProductCart(
    cartId: number,
    productId: number,
    amount: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      cartId,
      productId,
      amount,
    });
  }

  async insertProductInCart(
    cartId: number,
    productId: number,
    amount: number,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(productId);

    const cartProduct = await this.verifyProductInCart(cartId, productId).catch(
      async () => {
        return this.createProductCart(cartId, productId, amount);
      },
    );

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + amount,
    });
  }
}
