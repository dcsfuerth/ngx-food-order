import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ICrudActionNames, IAction, RestService, generateCrudActionNames } from '@dcs/ngx-utils';

import { ORDER_COLLECTION_NAME } from './order.constants';
import { IOrderItem } from './order-item.class';

export const actionNames: ICrudActionNames = generateCrudActionNames(ORDER_COLLECTION_NAME);
export const ORDER_ADD_EMPTY_ITEM: string = 'ORDER_ADD_EMPTY_ITEM';

@Injectable()
export class OrderActions {
  constructor(private http: RestService) {}

  @dispatch()
  public read(): IAction {
    return {
      type: actionNames.read,
      payload: this.http.get('order'),
    };
  }

  @dispatch()
  public addEmptyItem(): IAction {
    return {
      type: ORDER_ADD_EMPTY_ITEM,
    };
  }

  @dispatch()
  public update(items: IOrderItem[], cancelAction?: Observable<any>): IAction {
    return {
      type: actionNames.update,
      payload: this.http.put('order', { items }),
      meta: {
        cancel: cancelAction,
      },
    };
  }
}
