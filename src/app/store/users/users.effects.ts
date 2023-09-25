import { Injectable } from "@angular/core";
import * as UsersActions from './users.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from "rxjs/operators";
import { IUser } from "../../common/interfaces";

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions
  ) {
  }

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.createUser),
    tap(({user}: { user: IUser}) => {
      // stub. Let's imagine there request to another server
    })
  ), { dispatch: false });
}
