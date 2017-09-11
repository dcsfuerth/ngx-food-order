import { Routes } from '@angular/router';

import { UsersPageComponent } from './users-page/users-page.component';
import { UsersNewComponent } from './users-new/users-new.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

export const routes: Routes = [
  { path: 'users', component: UsersPageComponent },
  { path: 'users/new', component: UsersNewComponent },
  { path: 'users/:id/edit', component: UsersEditComponent }
];
