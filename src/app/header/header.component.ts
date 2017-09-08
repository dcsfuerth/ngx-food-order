import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'dcs-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  constructor(private translateService: TranslateService) {}
  public setLocale(locale: string) {
    this.translateService.use(locale);
  }
}
