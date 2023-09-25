import { Injectable } from "@angular/core";
import { IUser } from "../common/interfaces";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { selectUsers } from "../store/users/users.selectors";
import { Store } from "@ngrx/store";
import { State } from "../store";

@Injectable()
export class UsersService {
  url = 'someServer';
  serverEnabled = false;

  constructor(
    private http: HttpClient,
    protected store: Store<State>,
  ) {
  }
  mapResponse(response) {
    return response.pipe(
      map((body: any) => body.data)
    );
  }

  getAll(filters: any): Observable<any> {
    return this.mapResponse(this.http.get(this.url, filters ));
  }

  getOne(id: number): Observable<any> {
    return this.mapResponse(this.http.get(this.url + `/${id}`));
  }

  create(user: IUser): Observable<any> {
    return this.serverEnabled ? this.mapResponse(this.http.post(this.url, user))
      : this.isUserNameTaken(user.userName, user.id).pipe(
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

  private isUserNameTaken(userName: string, id: number): Observable<any> {
    return this.store.select(selectUsers).pipe(
      map(users => users.some(user => (user.userName === userName) && (user.id !== id)))
    )
  }
}
