import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  APP_REDUCERS,
  APP_EPICS,
  generateEntityActionNames,
  extractCollectionsEpicFactory,
  collectionReducerFactory
} from '@dcs/ngx-utils';

import { ProductsPageComponent } from './products-page/products-page.component';
import { productsRoutes } from './products.routes';
import { productsReducer } from './backend/products.reducer';
import { ProductsActions } from './backend/products.actions';
import { productsCollectionEpic } from './backend/products.epics';

@NgModule({
  declarations: [ProductsPageComponent],
  providers: [
    ProductsActions,
    { provide: APP_REDUCERS, useValue: { name: 'products', reducer: productsReducer }, multi: true },
    { provide: APP_EPICS, useValue: productsCollectionEpic, multi: true }
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(productsRoutes)]
})
export class ProductsModule {}
