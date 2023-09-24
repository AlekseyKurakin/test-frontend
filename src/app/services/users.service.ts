import { Injectable } from "@angular/core";
import { IUser } from "../common/interfaces";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable()
export class UsersService {
  url = 'someBeServer';

  constructor(
    private http: HttpClient
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
    return this.mapResponse(this.http.post(this.url, user));
  }

  update(id: number, user: IUser): any {
    this.http.put(this.url + `/${id}`, user)
  }

  delete(id: number): any {
    this.http.delete(this.url + `/${id}`)
  }
}
