import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { schema } from 'normalizr';
import { IAction, RestService, generateEntityActionNames } from '@dcs/ngx-utils';

import { PRODUCTS_COLLECTION_KEY } from './products.constants';

export const productSchema = new schema.Entity(PRODUCTS_COLLECTION_KEY);
export const productsSchema = new schema.Array(productSchema);

export const actionNames = generateEntityActionNames(PRODUCTS_COLLECTION_KEY);

@Injectable()
export class ProductsActions {
  constructor(private http: RestService) {}

  @dispatch()
  public read(): IAction {
    return {
      type: actionNames.read,
      payload: this.http.get('products', {}, productsSchema)
    };
  }
}
