import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Course} from './course';

@Injectable()
export class CoursesService {
  simpleCoursesUrl = environment.apiUrl + "simplecoursesUrl/";
  coursesUrl = environment.apiUrl + "courses/";

  constructor(private http: Http) {
  }

  getAllCourses(limit, offset, orderBy, orderDirection, filter): Observable<Course[]> {
    /*return this.http.get(this.simpleCoursesUrl + '?limit=' + limit + '&offset=' + offset + '&order_by=' + orderBy + '&order_direction=' + orderDirection + '&filter=' + filter)
     .map(res => res.json() as Course[]);*/
    return this.http.get(this.simpleCoursesUrl + '?limit=' + limit + '&offset=' + offset)
      .map(res => res.json().data.items as Course[]);
  }

  getCoursesCount(): Observable<number> {
    return this.http.get(this.coursesUrl)
      .map(res => res.json().data.currentItemCount as number);
  }

  getCourse(id): Observable<Course> {
    return this.http.get(this.coursesUrl + id)
      .map(res => res.json().data.items[0] as Course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(this.coursesUrl + id)
      .map(res => res.json());
  }

  deleteCourseImage(id: number, img: string): Observable<any> {
    return this.http.delete(this.simpleCoursesUrl + id + '/images/' + img)
      .map(res => res.json());
  }

  courseExisting(id: number, data): Observable<any> {
    return this.http.put(this.coursesUrl + id, data)
      .map(res => res).catch(this.handleError);
  }

  courseNew(data): Observable<any> {
    return this.http.post(this.coursesUrl, data)
      .map(res => res.json()).catch(this.handleError);
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
