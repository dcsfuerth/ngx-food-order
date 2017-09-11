import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { User } from '../backend/user.class';
import { UsersActions } from '../backend/users.actions';
import { updatingSelector } from '../backend/users.selectors';

@Component({
  selector: 'dcs-users-new',
  templateUrl: './users-new.component.html'
})
export class UsersNewComponent implements OnInit {
  @select(updatingSelector) public updating$: Observable<boolean>;

  public user: User;

  constructor(private actions: UsersActions) {}

  public ngOnInit() {
    this.user = new User();
  }

  public createUser(user: User) {
    this.actions.create(user);
  }
}
