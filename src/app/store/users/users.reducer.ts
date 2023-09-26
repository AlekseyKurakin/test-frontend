import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { IUser } from "../../common/interfaces";
import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from './users.actions';

export const usersFeatureKey = 'users';

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export interface UsersState {
  users: IUser[];
}

function setLocalStorage(users): void {
  localStorage.setItem('users', JSON.stringify(users));
}

function initialUsersState(): UsersState {
  const storedData = JSON.parse(localStorage.getItem('users'));
  console.log(storedData)
  const usersList = storedData ? storedData : [
    {
      id: 1,
      userName: 'Alex',
      firstName: 'Alexey',
      lastName: 'last name',
      email: 'kurakin.s.alexey@gmail.com',
      type: 'Admin',
      password: '12345678',
    },
  ];

  return {
    users: usersList
  }
}

export const usersReducer = createReducer(
  initialUsersState(),

  on(UserActions.createUser, (state, { user }) => {
    // just some workaround because we dont have server to do it
    const highestId = state.users.reduce((maxId, obj) => {
      return obj.id > maxId ? obj.id : maxId;
    }, -1);

    const currentState = {
      ...state,
      users: [...state.users, {...user, id: highestId + 1 }],
    }

    setLocalStorage(currentState.users);
    return currentState
  }),

  on(UserActions.updateUser, (state, { user }) => {
    const currentState = {
      ...state,
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    }
    setLocalStorage(currentState.users);
    return currentState;
  }),

  on(UserActions.deleteUser, (state, { id }) => {
    const currentState = {
      ...state,
      users: state.users.filter((user) => user.id !== id),
    }

    setLocalStorage(currentState.users);
    return currentState;
  })
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
