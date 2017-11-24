import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {Program} from '../classes/program';


@Injectable()
export class ProgramsService {

  programsUrl = environment.apiUrl + 'programs/';
  programsFaculties = environment.apiUrl + 'faculties/';

  constructor(private http: Http) {
  }

  getAllPrograms(): Observable<Program[]> {
    return this.http.get(this.programsUrl)
      .map(res => res.json().data.items as Program[]).catch(this.handleError);
  }

  getProgramsByFaculty(facultyId): Observable<Program[]> {
    return this.http.get(this.programsFaculties + facultyId + /programs/)
      .map(res => res.json().data.items as Program[]).catch(this.handleError);
  }



  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}


