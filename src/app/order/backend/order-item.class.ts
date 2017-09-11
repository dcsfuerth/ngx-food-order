import { Record } from 'immutable';
import { EmbeddedRecord } from '@dcs/ngx-utils';

import { Product } from '../../products/backend/product.class';
import { User } from '../../users/backend/user.class';

export interface IOrder {
  id: number;
  userId: number;
  productId: number;
  numberOfProducts: number;
  user: User;
  product: Product;
}

export const DEFAULT_VALUES = {
  id: 0,
  userId: 0,
  productId: 0,
  numberOfProducts: 0,
  user: new User(),
  product: new Product()
};

export class OrderItem extends Record(DEFAULT_VALUES) implements IOrder {
  public readonly id: number;
  public readonly userId: number;
  public readonly productId: number;
  public readonly numberOfProducts: number;
  @EmbeddedRecord(User) public readonly user: User;
  @EmbeddedRecord(Product) public readonly product: Product;

  get priceSum(): number {
    console.log('hier', this.getIn(['product', 'price']) || 0, this.numberOfProducts);
    return (this.getIn(['product', 'price']) || 0) * this.numberOfProducts;
  }
}
