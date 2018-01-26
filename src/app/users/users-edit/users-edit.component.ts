import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

import { ContainerComponent } from '../../utils/container-component';
import { UsersActions } from '../backend/users.actions';
import { User } from '../backend/user.class';
import {
  currentUserSelector,
  updatingSelector,
} from '../backend/users.selectors';

@Component({
  selector: 'dcs-users-edit',
  templateUrl: './users-edit.component.html',
})
export class UsersEditComponent extends ContainerComponent implements OnInit {
  @select(currentUserSelector) public user$: Observable<User>;
  public user: User;
  @select(updatingSelector) public updating$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private actions: UsersActions) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.user$, 'user');

    this.subscribeToObservable(this.route.params, params => {
      this.actions.readOne(params.id);
    });
  }

  public updateUser(user: User) {
    this.actions.update(user);
  }
}
