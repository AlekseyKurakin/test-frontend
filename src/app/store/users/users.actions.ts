import {createAction, props} from "@ngrx/store";
import {IUser} from "../../common/interfaces";

export const createUser = createAction(
'[User Store] Create users',
  props<{user : IUser}>()
)

export const updateUser = createAction(
  '[User Store] Update users',
  props<{user : IUser}>()
)

export const deleteUser = createAction(
  '[User Store] Delete users',
  props<{id : number}>()
)


