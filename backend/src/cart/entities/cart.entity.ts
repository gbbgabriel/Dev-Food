import { CartProductEntity } from '@src/cart-product/entities/cart-product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(
    () => CartProductEntity,
    (cartProduct: CartProductEntity) => cartProduct.cart,
  )
  cartProduct?: CartProductEntity[];
}
