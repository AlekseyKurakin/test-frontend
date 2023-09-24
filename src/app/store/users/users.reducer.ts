import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {IUser} from "../../common/interfaces";
import {Action, createReducer, on} from "@ngrx/store";
import * as UserActions from './users.actions';

export const usersFeatureKey = 'users';

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export interface UsersState {
  users: IUser[];
}

const initialUsersState: UsersState = {
  users: [
    {
      id: 1,
      userName: 'Inituser',
      firstName: 'Alexey',
      lastName: 'Kurakin',
      email: 'kurakin.s.alexey@gmail.com',
      type: 'Admin',
      password: '1234qwer',
    },
  ],
};
export const usersReducer = createReducer(
  initialUsersState,

  on(UserActions.createUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),

  on(UserActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  }))
)

const {
  selectIds,
  selectEntities,
  selectAll
} = adapter.getSelectors();

export const selectUsersIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;

export const reducer = (state: UsersState | undefined, action: Action) => usersReducer(state, action);
