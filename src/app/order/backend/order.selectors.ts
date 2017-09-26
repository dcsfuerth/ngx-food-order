import { Selector } from 'reselect';
import { List, Map } from 'immutable';
import { IState, createSelector } from '@dcs/ngx-utils';

import { productsSelectors } from '../../products/backend/products.selectors';
import { IOrderState } from './order.reducer';
import { OrderItem } from './order-item.class';
import { User } from '../../users/backend/user.class';
import { usersMapSelector } from '../../users/backend/users.selectors';

export const orderSubStateSelector: (state: IState) => IOrderState = state => state.get('order');
export const orderLoadedSelector: (state: IState) => IOrderState = state =>
  state.getIn(['order', 'loaded']);
export const orderRawItemsSelector: (state: IState) => List<Map<string, number>> = state =>
  state.getIn(['order', 'entity', 'items']);

export const orderItemsSelector: Selector<IState, List<OrderItem>> = createSelector(
  [orderRawItemsSelector, productsSelectors.modelsMapSelector, usersMapSelector],
  (items, productsMap, usersMap) => {
    return items.map((rawItem: any) => {
      rawItem = rawItem.merge({
        product: productsMap.get(String(rawItem.get('productId'))),
        user: usersMap.get(String(rawItem.get('userId'))),
      });
      return new OrderItem(rawItem);
    });
  },
);

export const totalPriceSelector: Selector<IState, number> = createSelector(
  [orderItemsSelector],
  orderItems => {
    return orderItems.reduce((sum, item) => {
      return sum + item.priceSum;
    }, 0);
  },
);

export const totalPriceByUserSelector: Selector<IState, Map<User, number>> = createSelector(
  [orderItemsSelector],
  orderItems => {
    return orderItems
      .groupBy(item => item.get('user'))
      .toMap()
      .map(group => group.reduce((sum, item) => sum + item.priceSum, 0));
  },
);
