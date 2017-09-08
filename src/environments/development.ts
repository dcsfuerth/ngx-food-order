import { GenericStoreEnhancer, Middleware } from 'redux';
import { IEnvironment, loggerMiddleware, ISettings, DefaultEnvironment, persistStateEnhancer } from '@dcs/ngx-utils';

export default class DevelopmentEnvironment extends DefaultEnvironment implements IEnvironment {
  public apiUrl = '//localhost:3001';
  public throwOnSchemaError = false;
  public pageTitle = 'DCS Food Order (DEVELOPMENT)';
  public base = '/';

  public additionalMiddleware: Middleware[] = [loggerMiddleware];
  // public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
}
