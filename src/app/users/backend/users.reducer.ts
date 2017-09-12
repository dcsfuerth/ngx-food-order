import { List, fromJS } from 'immutable';
import { createImmutableState, IAction, ImmutableState, mergeState } from '@dcs/ngx-utils';
import {
  usersReadActions,
  usersCreateActions,
  usersUpdateActions,
  usersDeleteActions
} from './users.actions';

export type IUsersState = ImmutableState<{
  entities: List<any>;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  error: any;
}>;

export const initialState: IUsersState = createImmutableState({
  entities: [],
  loading: false,
  loaded: false,
  updating: false,
  error: null
});

export function usersReducer(state: IUsersState = initialState, action: IAction): IUsersState {
  switch (action.type) {
    case usersReadActions.start:
      return mergeState(state, { loading: true, loaded: false, error: null });

    case usersReadActions.next:
      return mergeState(state, { loading: false, loaded: true, entities: action.payload });

    case usersReadActions.error:
      return mergeState(state, {
        loading: false,
        entities: initialState.get('entities'),
        error: action.payload
      });

    case usersCreateActions.start:
      return mergeState(state, { updating: true });

    case usersCreateActions.next:
      return mergeState(state, {
        updating: false,
        entities: state.get('entities').push(fromJS(action.payload))
      });

    case usersUpdateActions.start:
      return mergeState(state, { updating: true });

    case usersUpdateActions.next:
      const updatedEntity = fromJS(action.payload);
      return state.set('updating', false).update('entities', entities => {
        return entities.map((entity: any) => {
          return entity.get('id') === updatedEntity.get('id') ? updatedEntity : entity;
        });
      });

    case usersDeleteActions.start:
      return mergeState(state, { updating: true });

    case usersDeleteActions.next:
      return state.set('updating', false).update('entities', (entities: any) => {
        return entities.filterNot((e: any) => e.get('id') === action.payload.id);
      });
  }

  return state;
}
