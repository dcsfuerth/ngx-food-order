import { Record } from 'immutable';

import { Product } from '../../products/backend/product.class';
import { User } from '../../users/backend/user.class';

export interface IOrderItem {
  userId: number;
  productId: number;
  numberOfProducts: number;
  user: User;
  product: Product;
}

export const DEFAULT_VALUES = {
  userId: 0,
  productId: 0,
  numberOfProducts: 0,
  user: new User(),
  product: new Product()
};

export class OrderItem extends Record(DEFAULT_VALUES) implements IOrderItem {
  public readonly userId: number;
  public readonly productId: number;
  public readonly numberOfProducts: number;
  public readonly user: User;
  public readonly product: Product;

  get priceSum(): number {
    return (this.getIn(['product', 'price']) || 0) * this.numberOfProducts;
  }
}
