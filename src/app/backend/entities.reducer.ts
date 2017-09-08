import { entityStoreReducerFactory, IReducer } from '@dcs/ngx-utils';
import { combineReducers } from 'redux-immutable';
import { PRODUCTS_COLLECTION_KEY } from '../products/backend/products.constants';

export const entitiesReducer = <IReducer>combineReducers({
  products: entityStoreReducerFactory(PRODUCTS_COLLECTION_KEY)
});
