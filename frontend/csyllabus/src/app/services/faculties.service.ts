import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {Faculty} from '../classes/faculty';


@Injectable()
export class FacultiesService {

  facultiesUrl = environment.apiUrl + 'faculties/';
  universitiesUrl = environment.apiUrl + 'universities/';

  constructor(private http: Http) {
  }

  getAllFaculties(): Observable<Faculty[]> {
    return this.http.get(this.facultiesUrl)
      .map(res => res.json().data.items as Faculty[]).catch(this.handleError);
  }

  getFacultiesByUniversity(universityId): Observable<Faculty[]> {
    return this.http.get(this.universitiesUrl + universityId + '/faculties/')
      .map(res => res.json().data.items as Faculty[]).catch(this.handleError);
  }


  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}


