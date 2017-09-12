import { Map } from 'immutable';
import {
  IAction,
  ImmutableState,
  ISubStateReducer,
  createImmutableState,
  mergeState
} from '@dcs/ngx-utils';

import { actionNames, ORDER_ADD_EMPTY_ITEM } from './order.actions';

export type IOrderState = ImmutableState<{
  entity: any;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  error: any;
}>;

export const initialState: IOrderState = createImmutableState({
  entity: { items: [] },
  loading: false,
  loaded: false,
  updating: false,
  error: null
});

export const orderReducer: ISubStateReducer<IOrderState> = (
  state: IOrderState = initialState,
  action: IAction
): IOrderState => {
  switch (action.type) {
    case actionNames.readStart:
      return mergeState(state, { loading: true, loaded: false, error: null });

    case actionNames.readNext:
      return mergeState(state, { loading: false, loaded: true, entity: action.payload });

    case actionNames.readError:
      return mergeState(state, {
        loading: false,
        entity: initialState.get('entity'),
        error: action.payload
      });

    case actionNames.updateStart:
      return mergeState(state, { updating: true });

    case actionNames.updateNext:
      return mergeState(state, { updating: false, entity: action.payload });

    case actionNames.updateError:
      return mergeState(state, {
        updating: false,
        entity: initialState.get('entity'),
        error: action.payload
      });

    case ORDER_ADD_EMPTY_ITEM:
      return state.updateIn(['entity', 'items'], items =>
        items.push(
          Map({
            userId: null,
            productId: null,
            numberOfProducts: 0
          })
        )
      );
  }

  return state;
};
