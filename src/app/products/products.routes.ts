import { Routes } from '@angular/router';

import { ProductsPageComponent } from './products-page/products-page.component';
import { NewProductPageComponent } from './new-product-page/new-product-page.component';
import { EditProductPageComponent } from './edit-product-page/edit-product-page.component';

export const productsRoutes: Routes = [
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/new', component: NewProductPageComponent },
  { path: 'products/:id/edit', component: EditProductPageComponent }
];
