import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { subStateStale, ContainerComponent, INormalizedCollectionState } from '@dcs/ngx-utils';

import { ProductsActions } from '../backend/products.actions';
import { productsSelectors } from '../backend/products.selectors';
import { Product } from '../backend/product.class';

@Component({
  selector: 'dcs-products-page',
  templateUrl: 'products-page.component.html',
})
export class ProductsPageComponent extends ContainerComponent implements OnInit {
  @select(productsSelectors.modelsSelector) public products$: Observable<List<Product>>;
  @select(productsSelectors.updatingSelector) public updating$: Observable<boolean>;
  @select(productsSelectors.loadingSelector) public loading$: Observable<boolean>;
  @select(productsSelectors.subStateSelector)
  public collection$: Observable<INormalizedCollectionState>;
  private collection: INormalizedCollectionState;

  constructor(private actions: ProductsActions) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.collection$, 'collection');

    if (subStateStale(this.collection, 30 * 1000)) {
      console.warn('data older than 30 seconds, load!');
      this.actions.read();
    }
  }

  public deleteProduct(product: Product) {
    this.actions.delete(product);
  }
}
