import { Middleware, GenericStoreEnhancer } from 'redux';
import {
  IEnvironment,
  loggerMiddleware,
  persistStateEnhancer,
  DefaultEnvironment
} from '@dcs/ngx-utils';
export default class StagingEnvironment extends DefaultEnvironment
  implements IEnvironment {
  public apiUrl = '//localhost:3001';
  public throwOnSchemaError = true;
  public pageTitle = 'DCS Food Order (STAGING)';
  public base = '/';

  public additionalMiddleware: Middleware[] = [loggerMiddleware];
  public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
}
