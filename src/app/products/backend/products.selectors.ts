import { OrderedSet } from 'immutable';
import { collectionSelectorsFactory, ImmutableState, IState } from '@dcs/ngx-utils';

import { Product } from './product.class';
import { PRODUCTS_COLLECTION_KEY } from './products.constants';

export const productsSelectors = collectionSelectorsFactory(PRODUCTS_COLLECTION_KEY, Product);
