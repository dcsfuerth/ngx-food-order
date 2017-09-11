import { ImmutableState, IAction, createImmutableState, mergeState } from '@dcs/ngx-utils';

import { usersReadOneActions } from './users.actions';

export interface ICurrentUserState {
  entity: any;
  loading: boolean;
  updating: boolean;
  error: any;
}

export const initialState: ImmutableState<ICurrentUserState> = createImmutableState({
  entity: {},
  loading: false,
  updating: false,
  error: null
});

export function currentUserReducer(
  state: ImmutableState<ICurrentUserState> = initialState,
  action: IAction
): ImmutableState<ICurrentUserState> {
  switch (action.type) {
    case usersReadOneActions.start:
      return mergeState(state, { loading: true, entity: initialState.get('entity'), error: null });

    case usersReadOneActions.next:
      return mergeState(state, { loading: false, entity: action.payload });

    case usersReadOneActions.error:
      return mergeState(state, { loading: false, entity: initialState.get('entity'), error: action.payload });
  }

  return state;
}
