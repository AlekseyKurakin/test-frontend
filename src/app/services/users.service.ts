import { Injectable } from "@angular/core";
import { IUser } from "../common/interfaces";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { selectUsers } from "../store/users/users.selectors";
import { Store } from "@ngrx/store";
import { State } from "../store";
import { MessageService } from "./message.service";
import { environment } from "../../environments/environment";

@Injectable()
export class UsersService {
  url = 'someServer';
  serverEnabled = environment.serverEnabled;

  constructor(
    private http: HttpClient,
    protected store: Store<State>,
    protected messageService: MessageService,
  ) {
  }
  mapResponse(response) {
    return response.pipe(
      map((body: any) => body.data),
      catchError((error: any) => {
        this.messageService.showMessage('error', `Something went wrong on server side`);
        return throwError({error})
      })
    )}

  getAll(filters: any): Observable<any> {
    return this.mapResponse(this.http.get(this.url, filters ));
  }

  getOne(id: number): Observable<any> {
    return this.mapResponse(this.http.get(this.url + `/${id}`));
  }

  create(user: IUser): Observable<any> {
    return this.serverEnabled ? this.mapResponse(this.http.post(this.url, user))
      : this.isUserNameTaken(user.userName, user.id).pipe(
        //must be done on BE and returned as error
        map(isUserNameTaken => {
          if (isUserNameTaken) {
            return { error: 'userNameAlreadyTaken'};
          } else {
            return user
          }
        })
      );
  }

  update(id: number, user: IUser): Observable<any> {
    return this.serverEnabled ? this.mapResponse( this.http.put(this.url + `/${id}`, user))
      : this.isUserNameTaken(user.userName, id).pipe(
        //must be done on BE and returned as error
        map(isUserNameTaken => {
          if (isUserNameTaken) {
            return { error: 'userNameAlreadyTaken'};
          } else {
            return user
          }
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.serverEnabled ? this.mapResponse(this.http.delete(this.url + `/${id}`)) : of(id);
  }

  private isUserNameTaken(userName: string, id: number): Observable<boolean> {
    return this.store.select(selectUsers).pipe(
      map(users => users.some(user => (user.userName === userName) && (user.id !== id)))
    )
  }
}
