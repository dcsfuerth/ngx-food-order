import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_REDUCERS } from '@dcs/ngx-utils';

import { routes } from './order.routes';
import { orderReducer } from './backend/order.reducer';
import { OrderActions } from './backend/order.actions';

import { OrderPageComponent } from './order-page/order-page.component';

@NgModule({
  declarations: [OrderPageComponent],
  providers: [OrderActions, { provide: APP_REDUCERS, useValue: { name: 'order', reducer: orderReducer }, multi: true }],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class OrderModule {}
