import { OrderedSet, fromJS } from 'immutable';
import {
  normalizedCollectionReducerFactory,
  normalizedEntityReducerFactory,
  ISubStateReducer,
  INormalizedCollectionState,
  INormalizedEntityState
} from '@dcs/ngx-utils';

import { PRODUCTS_COLLECTION_KEY } from './products.constants';
import { actionNames } from './products.actions';

export const productsReducer: ISubStateReducer<INormalizedCollectionState> = normalizedCollectionReducerFactory(
  PRODUCTS_COLLECTION_KEY
);

export const currentProductReducer: ISubStateReducer<INormalizedEntityState> = normalizedEntityReducerFactory(
  PRODUCTS_COLLECTION_KEY
);
