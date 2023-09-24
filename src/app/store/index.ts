import * as fromUsers from './users/users.reducer';
import {ActionReducerMap, MetaReducer} from "@ngrx/store";

export interface State {
  users: fromUsers.UsersState
}

export const reducers: ActionReducerMap<State> = {
  users: fromUsers.reducer
}

export const metaReducers: MetaReducer<State>[] = [];
