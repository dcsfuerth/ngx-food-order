import { List } from 'immutable';
import { productsSelectors } from '../../products/backend/products.selectors';
import {
  normalizedCollectionSelectorsFactory,
  INormalizedCollectionSelectors,
  IState,
  createSelector
} from '@dcs/ngx-utils';

import { OrderItem } from './order-item.class';
import { Product } from '../../products/backend/product.class';
import { User } from '../../users/backend/user.class';
import { ORDER_COLLECTION_NAME } from './order.constants';
import { orderSchema } from './order.schema';
import { usersMapSelector } from '../../users/backend/users.selectors';

export const orderSelectors: INormalizedCollectionSelectors<OrderItem> = normalizedCollectionSelectorsFactory(
  ORDER_COLLECTION_NAME,
  OrderItem,
  orderSchema
);

orderSelectors.modelsSelector = createSelector(
  [orderSelectors.subStateSelector, orderSelectors.idsSelector, productsSelectors.modelsMapSelector, usersMapSelector],
  (orderSubState, ids, productsMap, usersMap) => {
    return orderSubState.get('result').map(id => {
      const order = new OrderItem(orderSubState.getIn(['entities', 'item', String(id)]));
      const product = productsMap.get(String(order.get('productId'))) || new Product();
      const user = usersMap.get(String(order.get('userId'))) || new User();
      return order.set('product', product).set('user', user);
    });
  }
);
