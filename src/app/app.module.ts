import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppTranslateModule, APP_TRANSLATIONS, APP_REDUCERS } from '@dcs/ngx-utils';

import { routes } from './app.routes';
import { translations as de } from './locale/de';
import { translations as en } from './locale/en';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';

import { PRODUCTS_COLLECTION_KEY } from './products/backend/products.constants';
import { actionNames } from './products/backend/products.actions';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HeaderComponent],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    BrowserModule,
    AppTranslateModule, // App modules
    HomeModule,
    ProductsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
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
  ]
})
export class AppModule {}
