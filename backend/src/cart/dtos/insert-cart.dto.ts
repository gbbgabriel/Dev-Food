import { IsNumber } from 'class-validator';

export class InsertCart {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
