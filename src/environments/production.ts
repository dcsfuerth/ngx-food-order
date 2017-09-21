import { GenericStoreEnhancer } from 'redux';
import {
  IEnvironment,
  persistStateEnhancer,
  DefaultEnvironment,
  IAutoUpdateSettings,
} from '@dcs/ngx-utils';
export default class ProductionEnvironment extends DefaultEnvironment implements IEnvironment {
  public pageTitle = 'DCS Food Order (production mode)';
  public base = '/';
  public apiUrl = '//localhost:3001';
  public throwOnSchemaError = true;
  public autoUpdate: IAutoUpdateSettings = 'confirm';
  public updateMessage = 'Updates available, reload page now?';
  public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
}
