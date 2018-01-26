import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { List, Map } from 'immutable';

import { ContainerComponent } from '../../utils/container-component';
import { User } from '../../users/backend/user.class';

import {
  orderItemsSelector,
  totalPriceSelector,
  totalPriceByUserSelector,
} from '../backend/order.selectors';
import { OrderItem } from '../backend/order-item.class';

@Component({
  selector: 'dcs-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent extends ContainerComponent
  implements OnInit {
  @select(orderItemsSelector) public orderItems$: Observable<List<OrderItem>>;
  public orderItems: List<OrderItem>;
  @select(totalPriceSelector) public totalPrice$: Observable<number>;
  public totalPrice: number;
  @select(totalPriceByUserSelector)
  public totalPriceByUser$: Observable<Map<User, number>>;
  public totalPriceByUser: Map<User, number>;

  public ngOnInit() {
    this.valueFromObservable(this.orderItems$, 'orderItems');
    this.valueFromObservable(this.totalPrice$, 'totalPrice');
    this.valueFromObservable(this.totalPriceByUser$, 'totalPriceByUser');
  }
}
