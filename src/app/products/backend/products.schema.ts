import { schema } from 'normalizr';

import { PRODUCTS_COLLECTION_KEY } from './products.constants';

export const productSchema = new schema.Entity(PRODUCTS_COLLECTION_KEY);
export const productsSchema = new schema.Array(productSchema);
