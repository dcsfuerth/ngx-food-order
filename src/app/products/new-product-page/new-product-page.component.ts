import { ProductsActions } from '../backend/products.actions';
import { Product } from '../backend/product.class';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';

@Component({
  selector: 'dcs-new-product-page',
  templateUrl: './new-product-page.component.html'
})
export class NewProductPageComponent extends ContainerComponent implements OnInit {
  public product: Product;

  constructor(private actions: ProductsActions) {
    super();
  }

  public ngOnInit() {
    this.product = new Product();
  }

  public createProduct(product: Product) {
    this.actions.create(product);
  }
}
