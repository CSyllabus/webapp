import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';

import 'rxjs/add/operator/catch';
import {User} from "./user/user";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
  apiUrl = environment.appUrl;
  static selfUser: User;
  static isSuperuser: boolean;
  static token: string;

  selfUserChange: Subject<User> = new Subject<User>();

  constructor(private http: Http) {
    this.selfUserChange.subscribe((user) => {
      if (user === undefined) {
        AuthService.selfUser = undefined;
        AuthService.isSuperuser = undefined;
      } else {
        AuthService.selfUser = user;
        AuthService.isSuperuser = user.is_admin;
      }
    });
  }

  submitLogIn(data): Observable<any> {
    return this.http.post(this.apiUrl + "api-token-auth/", data)
      .map(res => res.json()).catch(AuthService.handleError);
  }

  private static handleError(error: any) {
    let errMsg = (error.json().non_field_errors) ? error.json().non_field_errors :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  setToken(token: string) {
    AuthService.token = token;
    localStorage.setItem('auth_token', token);
  }

  setUser(user: User) {
    this.selfUserChange.next(user);
  }


   logOut() {
    localStorage.removeItem('auth_token');
    this.selfUserChange.next(undefined);
  }
}
