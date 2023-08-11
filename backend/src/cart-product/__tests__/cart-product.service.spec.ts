import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { ProductService } from '@src/product/product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '@src/product/__mocks__/product.mock';
import { cartMock } from '@src/cart/__mocks__/cart.mock';
import { inserCartMock } from '@src/cart/__mocks__/insert-cart.mock';
import { productCartMock } from '../__mocks__/product-cart.mock';
import { NotFoundException } from '@nestjs/common';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(productCartMock),
            delete: jest.fn().mockResolvedValue(true),
            save: jest.fn().mockResolvedValue(productCartMock),
          },
        },
        CartProductService,
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should return Delete Result after delete product', async () => {
    const deleteResult = await service.deleteProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(deleteResult).toEqual(true);
  });
  it('should return CartProduct after create', async () => {
    const productInCart = await service.createProductCart(
      inserCartMock.amount,
      inserCartMock.productId,
      cartMock.id,
    );

    expect(productInCart).toEqual(productCartMock);
  });

  it('should return error in exception create', async () => {
    jest
      .spyOn(cartProductRepository, 'save')
      .mockRejectedValueOnce(new Error());

    expect(
      service.createProductCart(
        inserCartMock.amount,
        inserCartMock.productId,
        cartMock.id,
      ),
    ).rejects.toThrowError();
  });

  it('should return error in exception delete', async () => {
    jest
      .spyOn(cartProductRepository, 'delete')
      .mockRejectedValueOnce(new Error());

    expect(
      service.deleteProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return CartProduct if exist', async () => {
    const productInCart = await service.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(productInCart).toEqual(productCartMock);
  });

  it('should return error if NotFoundException in verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return error in exception verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });
});
