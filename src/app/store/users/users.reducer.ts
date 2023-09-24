import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { IUser } from "../../common/interfaces";
import { Action, createReducer, on } from "@ngrx/store";
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
      userName: 'Alex',
      firstName: 'Alexey',
      lastName: 'last name',
      email: 'kurakin.s.alexey@gmail.com',
      type: 'Admin',
      password: '12345678',
    },
  ],
};
export const usersReducer = createReducer(
  initialUsersState,

  on(UserActions.createUser, (state, { user }) => {
    // just some workaround because we dont have server to do it
    const highestId = state.users.reduce((maxId, obj) => {
      return obj.id > maxId ? obj.id : maxId;
    }, -1);

    return {
      ...state,
      users: [...state.users, {...user, id: highestId + 1 }],
    }
  }),

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
