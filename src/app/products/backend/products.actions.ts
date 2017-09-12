import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { normalize } from 'normalizr';
import { IAction, RestService, generateCrudActionNames, ICrudActionNames } from '@dcs/ngx-utils';

import { Product } from './product.class';
import { PRODUCTS_COLLECTION_KEY } from './products.constants';
import { productsSchema, productSchema } from './products.schema';

export const actionNames: ICrudActionNames = generateCrudActionNames(PRODUCTS_COLLECTION_KEY);

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

  @dispatch()
  public readOne(id: string): IAction {
    return {
      type: actionNames.readOne,
      payload: this.http.get(`products/${id}`, {}, productSchema)
    };
  }

  @dispatch()
  public delete(product: Product): IAction {
    return {
      type: actionNames.delete,
      payload: this.http.delete(`products/${product.id}`).map(() => ({ result: product.id }))
    };
  }

  @dispatch()
  public create(product: Product): IAction {
    return {
      type: actionNames.create,
      payload: this.http.post('products', product, {}, productSchema)
    };
  }

  @dispatch()
  public update(product: Product): IAction {
    return {
      type: actionNames.update,
      payload: this.http.put(`products/${product.id}`, product, {}, productSchema)
    };
  }

  @dispatch()
  public setCurrent(product: Product): IAction {
    return {
      type: actionNames.setCurrent,
      payload: normalize(product.toJS(), productSchema)
    };
  }
}
