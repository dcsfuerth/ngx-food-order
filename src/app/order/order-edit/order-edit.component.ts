import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productsSelectors } from '../../products/backend/products.selectors';
import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { List, fromJS } from 'immutable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { orderRawItemsSelector } from '../backend/order.selectors';
import { usersSelector } from '../../users/backend/users.selectors';
import { OrderActions } from '../backend/order.actions';
import { OrderItem } from '../backend/order-item.class';
import { User } from '../../users/backend/user.class';
import { Product } from '../../products/backend/product.class';

import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'dcs-order-edit',
  templateUrl: './order-edit.component.html',
})
export class OrderEditComponent extends OrderSummaryComponent implements OnInit {
  @select(usersSelector) public users$: Observable<List<User>>;
  public users: List<User>;
  @select(productsSelectors.modelsSelector) public products$: Observable<List<Product>>;
  public products: List<Product>;

  @select(orderRawItemsSelector) public rawItems$: Observable<List<any>>;
  public rawItems: List<any>;

  public form: FormArray;

  constructor(private fb: FormBuilder, private actions: OrderActions) {
    super();
    this.form = this.fb.array([]);
  }

  public ngOnInit() {
    super.ngOnInit();

    const cancelUpdate = new Subject();

    this.valueFromObservable(this.users$, 'users');
    this.valueFromObservable(this.products$, 'products');
    this.valueFromObservable(this.rawItems$, 'rawItems');

    this.subscribeToObservable(this.orderItems$, orderItems => {
      this.form.controls = [];

      orderItems.forEach(item => {
        this.form.push(this.buildFormGroup(item));
      });
    });

    this.subscribeToObservable(
      this.form.valueChanges.debounceTime(10).filter(value => {
        return !this.rawItems.equals(fromJS(value));
      }),
      value => {
        if (this.form.valid) {
          cancelUpdate.next();
          this.actions.update(value, cancelUpdate);
        }
      },
    );
  }

  public getFormGroup(index: number): FormGroup {
    return this.form.controls[index] as FormGroup;
  }

  public trackById(index: number, item: any) {
    return item.id;
  }

  public addOrderItem() {
    this.actions.addEmptyItem();
  }

  public removeOrderItem(index: number) {
    this.actions.update(this.rawItems.delete(index).toJS());
  }

  protected buildFormGroup(item: OrderItem): FormGroup {
    return this.fb.group({
      productId: [item.productId, Validators.required],
      userId: [item.userId, Validators.required],
      numberOfProducts: [item.numberOfProducts, [Validators.required, Validators.min(1)]],
    });
  }
}
