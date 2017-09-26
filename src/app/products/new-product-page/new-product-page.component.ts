import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { ContainerComponent } from '@dcs/ngx-utils';

import { ProductsActions } from '../backend/products.actions';
import { currentProductSelectors } from '../backend/products.selectors';
import { Product } from '../backend/product.class';

@Component({
  selector: 'dcs-new-product-page',
  templateUrl: './new-product-page.component.html',
})
export class NewProductPageComponent extends ContainerComponent implements OnInit {
  public product: Product;
  @select(currentProductSelectors.updatingSelector) public updating$: Observable<boolean>;
  public updating: boolean;

  constructor(private actions: ProductsActions) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.updating$, 'updating');
    this.product = new Product();
  }

  public createProduct(product: Product) {
    this.actions.create(product);
  }
}
