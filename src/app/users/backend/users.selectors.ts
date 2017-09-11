import { List, Map } from 'immutable';
import { Selector } from 'reselect';
import { createSelector, IState } from '@dcs/ngx-utils';

import { User } from './user.class';

export const loadingSelector = (state: IState): boolean => state.getIn(['users', 'loading']);
export const loadedSelector = (state: IState): boolean => state.getIn(['users', 'loaded']);
export const updatingSelector = (state: IState): boolean => state.getIn(['users', 'updating']);
export const rawUsersSelector = (state: IState): List<Map<string, any>> => state.getIn(['users', 'entities']);
export const rawUserSelector = (state: IState): Map<string, any> => state.getIn(['currentUser', 'entity']);

export const usersSelector: Selector<IState, List<User>> = createSelector([rawUsersSelector], users => {
  return users.map(item => new User(item));
});

export const usersMapSelector: Selector<IState, Map<string, User>> = createSelector([rawUsersSelector], users => {
  return users.reduce((acc, item) => {
    return acc.set(String(item.get('id')), new User(item));
  }, Map());
});
export const currentUserSelector: Selector<IState, User> = createSelector([rawUserSelector], user => {
  return new User(user);
});
