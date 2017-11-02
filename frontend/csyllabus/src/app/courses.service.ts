
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

import { Course } from './course';


@Injectable()
export class CoursesService {

  coursesUrl = environment.apiUrl + "courses/";

  constructor(private http: Http) { }

  getAllCourses(): Observable<Course[]> {
   return this.http.get(this.coursesUrl)
     .map(res => res.json() as Course[]).catch(this.handleError);
 }


 private handleError(error: any) {
   let errMsg = (error.message) ? error.message :
     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
   console.error(errMsg);
   return Observable.throw(errMsg);
 }


}


