import { OrderedSet } from 'immutable';
import { collectionReducerFactory, IAction, ImmutableState } from '@dcs/ngx-utils';
import { PRODUCTS_COLLECTION_KEY } from './products.constants';

export const productsReducer = collectionReducerFactory(PRODUCTS_COLLECTION_KEY);
