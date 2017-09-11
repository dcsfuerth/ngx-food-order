import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { APP_REDUCERS, APP_EPICS, APP_TRANSLATIONS } from '@dcs/ngx-utils';

import { routes } from './users.routes';
import { UsersActions } from './backend/users.actions';
import { usersReducer } from './backend/users.reducer';
import { currentUserReducer } from './backend/currentUser.reducer';
import { redirectAfterSaveEpic } from './backend/users.epics';

import { translations as de } from './locale/de';
import { translations as en } from './locale/en';

import { UsersPageComponent } from './users-page/users-page.component';
import { UsersNewComponent } from './users-new/users-new.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersFormComponent } from './users-form/users-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [UsersPageComponent, UsersNewComponent, UsersEditComponent, UsersFormComponent],
  providers: [
    UsersActions,
    { provide: APP_REDUCERS, useValue: { name: 'users', reducer: usersReducer }, multi: true },
    { provide: APP_REDUCERS, useValue: { name: 'currentUser', reducer: currentUserReducer }, multi: true },
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
  ]
})
export class UsersModule {}
