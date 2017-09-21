import { UPDATE_LOCATION } from '@angular-redux/router';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { IAction } from '@dcs/ngx-utils';

import { actionNames } from './products.actions';

export function redirectAfterSaveEpic(actions$: ActionsObservable<IAction>): Observable<IAction> {
  return actions$
    .ofType(actionNames.updateNext, actionNames.createNext)
    .mapTo({ type: UPDATE_LOCATION, payload: '/products' });
}
