import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { ContainerComponent } from '@dcs/ngx-utils';

import { orderSelectors } from '../backend/order.selectors';
import { OrderItem } from '../backend/order-item.class';
import { OrderActions } from '../backend/order.actions';
import { UsersActions } from '../../users/backend/users.actions';
import { ProductsActions } from '../../products/backend/products.actions';

@Component({
  selector: 'dcs-order-page',
  templateUrl: './order-page.component.html'
})
export class OrderPageComponent extends ContainerComponent implements OnInit {
  @select(orderSelectors.modelsSelector) public order$: Observable<List<OrderItem>>;
  public order: List<OrderItem>;

  constructor(
    private actions: OrderActions,
    private productsActions: ProductsActions,
    private usersActions: UsersActions
  ) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.order$, 'order');

    this.productsActions.read();
    this.usersActions.read();
    this.actions.read();
  }

  get priceTotal(): number {
    return this.order.reduce((sum, item) => {
      return sum + item.priceSum;
    }, 0);
  }
}
