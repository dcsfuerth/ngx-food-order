import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { ICrudActionNames, IAction, RestService, generateCrudActionNames } from '@dcs/ngx-utils';

import { ORDER_COLLECTION_NAME } from './order.constants';
import { orderSchema } from './order.schema';

export const actionNames: ICrudActionNames = generateCrudActionNames(ORDER_COLLECTION_NAME);

@Injectable()
export class OrderActions {
  constructor(private http: RestService) {}

  @dispatch()
  public read(): IAction {
    return {
      type: actionNames.read,
      payload: this.http.get('order?_expand=user&_expand=product', {}, orderSchema)
    };
  }
}
