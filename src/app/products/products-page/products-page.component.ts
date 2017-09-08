import { INormalizedCollectionState } from '@dcs/ngx-utils/module';
import { List } from 'Immutable';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { subStateStale, ContainerComponent } from '@dcs/ngx-utils';

import { ProductsActions } from '../backend/products.actions';
import { productsSelectors } from '../backend/products.selectors';
import { Product } from '../backend/product.class';

@Component({
  selector: 'dcs-products-page',
  templateUrl: 'products-page.component.html'
})
export class ProductsPageComponent extends ContainerComponent implements OnInit {
  @select(productsSelectors.modelsSelector) public products$: Observable<List<Product>>;
  @select(productsSelectors.updatingSelector) public updating$: Observable<boolean>;
  public updating: boolean;
  @select(productsSelectors.subStateSelector) public collection$: Observable<INormalizedCollectionState>;
  private collection: INormalizedCollectionState;

  constructor(private actions: ProductsActions) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.collection$, 'collection');
    this.valueFromObservable(this.updating$, 'updating');

    if (subStateStale(this.collection, 30000)) {
      console.warn('data older than 30 seconds, load!');
      this.actions.read();
    }
  }

  public deleteProduct(product: Product) {
    this.actions.delete(product);
  }
}
