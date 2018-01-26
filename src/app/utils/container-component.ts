import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ContainerComponent as LibContainerComponent } from '@dcs/ngx-utils';

/**
 * Because of several angular bugs regarding ngOnDestroy and class inheritance.
 */
export class ContainerComponent extends LibContainerComponent
  implements OnDestroy {
  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
