import { List } from 'immutable';
import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';
import { Observable } from 'rxjs';

import { UsersActions } from '../backend/users.actions';
import { User } from '../backend/users.class';
import { usersSelector, updatingSelector, loadedSelector } from '../backend/users.selectors';

@Component({
  selector: 'dcs-users-page',
  templateUrl: './users-page.component.html'
})
export class UsersPageComponent extends ContainerComponent implements OnInit {
  @select(usersSelector) public users$: Observable<List<User>>;
  public users: List<User>;
  @select(loadedSelector) public loaded$: Observable<boolean>;
  public loaded: boolean;
  @select(updatingSelector) public updating$: Observable<boolean>;

  constructor(private actions: UsersActions) {
    super();
  }
  public ngOnInit() {
    this.valueFromObservable(this.users$, 'users');
    this.valueFromObservable(this.loaded$, 'loaded');

    if (!this.loaded) {
      this.actions.read();
    }
  }

  public deleteUser(user: User) {
    this.actions.delete(user);
  }
}
