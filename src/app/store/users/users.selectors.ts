import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectUserEntities, selectUsersIds, usersFeatureKey, UsersState} from "./users.reducer";

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(selectUsersState, (state) => state.users);

export const selectUserById = (id: number) =>
  createSelector(
    selectUsersState,
    (state) => state.users.find((user) => user.id === id)
  );

