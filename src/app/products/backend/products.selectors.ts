import { OrderedSet } from 'immutable';
import {
  normalizedCollectionSelectorsFactory,
  normalizedEntitiesSelectorFactory,
  INormalizedCollectionSelectors,
  INormalizedEntitySelectors
} from '@dcs/ngx-utils';

import { Product } from './product.class';
import { productsSchema, productSchema } from './products.schema';
import { PRODUCTS_COLLECTION_KEY, PRODUCTS_ENTITY_KEY } from './products.constants';

export const productsSelectors: INormalizedCollectionSelectors<Product> = normalizedCollectionSelectorsFactory(
  PRODUCTS_COLLECTION_KEY,
  Product,
  productsSchema
);

export const currentProductSelectors: INormalizedEntitySelectors<Product> = normalizedEntitiesSelectorFactory(
  PRODUCTS_ENTITY_KEY,
  Product,
  productSchema
);
