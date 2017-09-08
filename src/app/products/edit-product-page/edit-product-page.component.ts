import { PRODUCTS_COLLECTION_KEY } from '../backend/products.constants';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { ContainerComponent, INormalizedCollectionState, hasModel } from '@dcs/ngx-utils';

import { ProductsActions } from '../backend/products.actions';
import { currentProductSelectors, productsSelectors } from '../backend/products.selectors';
import { Product } from '../backend/product.class';

@Component({
  selector: 'dcs-edit-product-page',
  templateUrl: './edit-product-page.component.html'
})
export class EditProductPageComponent extends ContainerComponent implements OnInit {
  @select(currentProductSelectors.modelSelector) public product$: Observable<Product>;
  public product: Product;
  @select(productsSelectors.subStateSelector) private productsState$: Observable<INormalizedCollectionState>;
  private productsState: INormalizedCollectionState;

  constructor(private actions: ProductsActions, private route: ActivatedRoute) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.product$, 'product');
    this.valueFromObservable(this.productsState$, 'productsState');

    this.subscribeToObservable(this.route.params, params => {
      if (String(this.product.id) !== params.id) {
        if (hasModel(this.productsState, PRODUCTS_COLLECTION_KEY, params.id, 300000)) {
          this.actions.setCurrent(this.productsState.getIn(['entities', PRODUCTS_COLLECTION_KEY, params.id]));
        } else {
          this.actions.readOne(params.id);
        }
      }
    });
  }

  public updateProduct(product: Product) {
    this.actions.update(product);
  }
}
