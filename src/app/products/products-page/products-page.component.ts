import { List } from 'Immutable';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { collectionStale, ICollectionState, ContainerComponent } from '@dcs/ngx-utils';

import { ProductsActions } from '../backend/products.actions';
import { productsSelectors } from '../backend/products.selectors';
import { Product } from '../backend/product.class';

@Component({
  selector: 'dcs-products-page',
  templateUrl: 'products-page.component.html'
})
export class ProductsPageComponent extends ContainerComponent implements OnInit {
  @select(productsSelectors.entitiesSelector) public products$: Observable<List<Product>>;
  @select(productsSelectors.collectionSelector) public collection$: Observable<ICollectionState>;
  private collection: ICollectionState;

  constructor(private actions: ProductsActions) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.collection$, 'collection');

    if (collectionStale(this.collection, 10000)) {
      console.warn('data stale!!!!!');
      this.actions.read();
    }
  }
}
