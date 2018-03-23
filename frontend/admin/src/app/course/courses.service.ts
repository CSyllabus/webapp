import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Course} from './course';
import {ErrorService} from "../services/error.service";

@Injectable()
export class CoursesService {
  simpleCoursesUrl = environment.apiUrl + "simplecoursesUrl/";
  coursesUrl = environment.apiUrl + "courses/";
  usersUrl = environment.apiUrl + "users/";


  constructor(private http: Http, private errorService: ErrorService) {
  }

  /*getAllCourses(limit, offset, orderBy, orderDirection, filter): Observable<Course[]> {
    return this.http.get(this.simpleCoursesUrl + '?limit=' + limit + '&offset=' + offset + '&order_by=' + orderBy + '&order_direction=' + orderDirection + '&filter=' + filter)
     .map(res => res.json() as Course[]);
    return this.http.get(this.simpleCoursesUrl + '?limit=' + limit + '&offset=' + offset)
      .map(res => res.json().data.items as Course[]);
  }*/

  getAllCoursesByUser(limit, offset, orderBy, orderDirection, filter):Observable<Course[]> {

    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.usersUrl + 'courses?limit=' + limit + '&offset=' + offset + '&sortby=' + orderBy + '&sortdirection=' + orderDirection, options)
      .map(res => res.json().data.items as Course[]).catch(this.errorService.handleError);
  }

  getCoursesCount(): Observable<number> {
    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.usersUrl + 'courses', options)
      .map(res => res.json().data.currentItemCount as number).catch(this.errorService.handleError);
  }

  getCourse(id): Observable<Course> {
    return this.http.get(this.coursesUrl + id)
      .map(res => res.json().data.items[0] as Course).catch(this.errorService.handleError);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(this.coursesUrl + id)
      .map(res => res).catch(this.errorService.handleError);

  }


  deleteCourseImage(id: number, img: string): Observable<any> {
    return this.http.delete(this.simpleCoursesUrl + id + '/images/' + img)
      .map(res => res.json());
  }

  courseExisting(id: number, data): Observable<any> {
    return this.http.put(this.coursesUrl + id, data)
      .map(res => res).catch(this.errorService.handleError);
  }

  courseNew(data): Observable<any> {

    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.coursesUrl, data, options)
      .map(res => res).catch(this.errorService.handleError);
  }
}
