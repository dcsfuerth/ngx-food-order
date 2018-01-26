import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ContainerComponent } from '../../utils/container-component';
import { OrderActions } from '../backend/order.actions';
import { UsersActions } from '../../users/backend/users.actions';
import { ProductsActions } from '../../products/backend/products.actions';
import { productsSelectors } from '../../products/backend/products.selectors';
import { loadedSelector } from '../../users/backend/users.selectors';
import { orderLoadedSelector } from '../backend/order.selectors';

@Component({
  selector: 'dcs-order-page',
  templateUrl: './order-page.component.html',
})
export class OrderPageComponent extends ContainerComponent implements OnInit {
  @select(productsSelectors.loadedSelector)
  public productsLoaded$: Observable<boolean>;
  @select(loadedSelector) public usersLoaded$: Observable<boolean>;
  @select(orderLoadedSelector) public orderLoaded$: Observable<boolean>;
  public productsLoaded: boolean;
  public usersLoaded: boolean;
  public orderLoaded: boolean;

  constructor(
    private actions: OrderActions,
    private productsActions: ProductsActions,
    private usersActions: UsersActions,
  ) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.productsLoaded$, 'productsLoaded');
    this.valueFromObservable(this.usersLoaded$, 'usersLoaded');
    this.valueFromObservable(this.orderLoaded$, 'orderLoaded');

    if (!this.productsLoaded) {
      this.productsActions.read();
    }

    if (!this.usersLoaded) {
      this.usersActions.read();
    }

    if (!this.orderLoaded) {
      this.actions.read();
    }
  }
}
