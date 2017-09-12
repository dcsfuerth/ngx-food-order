import { Routes } from '@angular/router';

import { OrderPageComponent } from './order-page/order-page.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

export const routes: Routes = [
  {
    path: 'order',
    component: OrderPageComponent,
    children: [
      { path: '', component: OrderSummaryComponent },
      { path: 'edit', component: OrderEditComponent }
    ]
  }
];
