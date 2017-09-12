import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APP_REDUCERS, APP_EPICS, APP_TRANSLATIONS } from '@dcs/ngx-utils';

import { productsRoutes } from './products.routes';
import { PRODUCTS_COLLECTION_KEY, PRODUCTS_ENTITY_KEY } from './backend/products.constants';
import { productsReducer, currentProductReducer } from './backend/products.reducer';
import { ProductsActions } from './backend/products.actions';
import { redirectAfterSaveEpic } from './backend/products.epics';

import { ProductsPageComponent } from './products-page/products-page.component';
import { NewProductPageComponent } from './new-product-page/new-product-page.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { EditProductPageComponent } from './edit-product-page/edit-product-page.component';

import { translations as en } from './locale/en';
import { translations as de } from './locale/de';

@NgModule({
  declarations: [
    ProductsPageComponent,
    NewProductPageComponent,
    EditProductPageComponent,
    ProductFormComponent
  ],
  providers: [
    ProductsActions,
    {
      provide: APP_REDUCERS,
      useValue: { name: PRODUCTS_COLLECTION_KEY, reducer: productsReducer },
      multi: true
    },
    {
      provide: APP_REDUCERS,
      useValue: { name: PRODUCTS_ENTITY_KEY, reducer: currentProductReducer },
      multi: true
    },
    { provide: APP_EPICS, useValue: redirectAfterSaveEpic, multi: true },
    {
      provide: APP_TRANSLATIONS,
      useValue: { name: 'de', translations: de },
      multi: true
    },
    {
      provide: APP_TRANSLATIONS,
      useValue: { name: 'en', translations: en },
      multi: true
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(productsRoutes)
  ]
})
export class ProductsModule {}
