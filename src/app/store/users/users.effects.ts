import { Injectable } from "@angular/core";
import * as UsersActions from './users.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from "rxjs/operators";
import { IUser } from "../../common/interfaces";
import { UsersService } from "../../services/users.service";

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
  ) {
  }

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.createUser),
    tap(({user}: { user: IUser}) => {
      this.usersService.create(user);
    })
  ), { dispatch: false });
}
