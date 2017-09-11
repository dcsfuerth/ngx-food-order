import {
  IAction,
  ImmutableState,
  INormalizedCollectionState,
  ISubStateReducer,
  createImmutableState,
  normalizedCollectionReducerFactory
} from '@dcs/ngx-utils';

import { ORDER_COLLECTION_NAME } from './order.constants';

export type IOrderState = ImmutableState<{
  entity: any;
  loading: boolean;
  updating: boolean;
  error: any;
}>;

export const initialState: IOrderState = createImmutableState({
  entity: {},
  loading: false,
  updating: false,
  error: null
});

export function orderReducer2(state: IOrderState = initialState, action: IAction): IOrderState {
  return state;
}

export const orderReducer: ISubStateReducer<INormalizedCollectionState> = normalizedCollectionReducerFactory(
  ORDER_COLLECTION_NAME
);
