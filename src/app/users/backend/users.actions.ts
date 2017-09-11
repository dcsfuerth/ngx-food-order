import { Injectable } from '@angular/core';
import { RestService, IAction, generateAsyncActionNames, IAsyncActionNames } from '@dcs/ngx-utils';
import { dispatch } from '@angular-redux/store';
import { User } from './user.class';

export const usersReadActions: IAsyncActionNames = generateAsyncActionNames('USERS_READ');
export const usersReadOneActions: IAsyncActionNames = generateAsyncActionNames('USERS_READ_ONE');
export const usersCreateActions: IAsyncActionNames = generateAsyncActionNames('USERS_CREATE');
export const usersUpdateActions: IAsyncActionNames = generateAsyncActionNames('USERS_UPDATE');
export const usersDeleteActions: IAsyncActionNames = generateAsyncActionNames('USERS_DELETE');

@Injectable()
export class UsersActions {
  constructor(private http: RestService) {}

  @dispatch()
  public read(): IAction {
    return {
      type: usersReadActions.base,
      payload: this.http.get('users')
    };
  }

  @dispatch()
  public readOne(id: string): IAction {
    return {
      type: usersReadOneActions.base,
      payload: this.http.get(`users/${id}`)
    };
  }

  @dispatch()
  public create(user: User): IAction {
    return {
      type: usersCreateActions.base,
      payload: this.http.post('users', user)
    };
  }

  @dispatch()
  public update(user: User): IAction {
    return {
      type: usersUpdateActions.base,
      payload: this.http.put(`users/${user.id}`, user)
    };
  }

  @dispatch()
  public delete(user: User): IAction {
    return {
      type: usersDeleteActions.base,
      payload: this.http.delete(`users/${user.id}`).map(() => user)
    };
  }
}
