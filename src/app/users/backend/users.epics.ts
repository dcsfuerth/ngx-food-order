import { ActionsObservable } from 'redux-observable';
import { UPDATE_LOCATION } from '@angular-redux/router';
import { Observable } from 'rxjs/Observable';
import { IAction } from '@dcs/ngx-utils';

import { usersCreateActions, usersUpdateActions } from './users.actions';

export function redirectAfterSaveEpic(actions$: ActionsObservable<IAction>): Observable<IAction> {
  return actions$
    .ofType(usersCreateActions.next, usersUpdateActions.next)
    .mapTo({ type: UPDATE_LOCATION, payload: '/users' });
}
