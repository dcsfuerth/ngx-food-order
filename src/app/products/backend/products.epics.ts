import { BatchAction } from 'redux-batched-actions';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { extractCollectionsEpicFactory, IAction } from '@dcs/ngx-utils';

import { actionNames } from './products.actions';
import { PRODUCTS_COLLECTION_KEY } from './products.constants';

export const productsCollectionEpic = extractCollectionsEpicFactory(
  [actionNames.readNext, actionNames.readOneNext],
  PRODUCTS_COLLECTION_KEY
);
