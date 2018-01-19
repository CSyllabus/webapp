import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/catch';
@Injectable()
export class AuthService {
  apiUrl = environment.appUrl;
  constructor(private http: Http) { }

  submitLogIn(data): Observable<any> {
    return this.http.post(this.apiUrl + "api-token-auth/", data)
      .map(res => res.json()).catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.json().non_field_errors) ? error.json().non_field_errors :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
