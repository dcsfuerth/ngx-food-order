import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_REDUCERS, APP_TRANSLATIONS } from '@dcs/ngx-utils';

import { routes } from './order.routes';
import { orderReducer } from './backend/order.reducer';
import { OrderActions } from './backend/order.actions';

import { translations as de } from './locale/de';
import { translations as en } from './locale/en';

import { OrderPageComponent } from './order-page/order-page.component';
import { OrderSubnavigationComponent } from './order-subnavigation/order-subnavigation.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderPageComponent,
    OrderSubnavigationComponent,
    OrderSummaryComponent,
    OrderEditComponent,
  ],
  providers: [
    OrderActions,
    { provide: APP_REDUCERS, useValue: { name: 'order', reducer: orderReducer }, multi: true },
    { provide: APP_TRANSLATIONS, useValue: { name: 'de', translations: de }, multi: true },
    { provide: APP_TRANSLATIONS, useValue: { name: 'en', translations: en }, multi: true },
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class OrderModule {}
