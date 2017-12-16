import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user';
import {Course} from '../course/course';
import {environment} from '../../environments/environment';

@Injectable()
export class UsersService {
  usersUrl = environment.apiUrl + "users/";

  constructor(private http: Http) {
  }

  /**
   *
   * @returns {Observable<R>}
   */
  getAllUsers(limit, offset, orderBy, orderDirection, filter): Observable<User[]> {
    return this.http.get(this.usersUrl + '?limit=' + limit + '&offset=' + offset)
      .map(res => res.json().data.items as User[]);
  }

  /**
   *
   * @returns {Observable<R>}
   */
  getUsersCount(): Observable<number> {
    return this.http.get(this.usersUrl)
      .map(res => res.json().data.currentItemCount as number);
  }

  /**
   *
   * @param id
   * @returns {Observable<R>}
   */
  getUser(id): Observable<User> {
    return this.http.get(this.usersUrl + id)
      .map(res => res.json().data.items[0] as User);
  }

  /**
   *
   * @param id
   * @returns {Observable<R>}
   */
  getSelf(): Observable<User> {
    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.usersUrl + 'self', options)
      .map(res => res.json().data.items[0] as User);
  }

  putUser(id: number, data): Observable<User> {
    return this.http.put(this.usersUrl + id, data)
      .map(res => res).catch(this.handleError);
  }

  postUser(data): Observable<User> {
    return this.http.post(this.usersUrl, data)
      .map(res => res).catch(this.handleError);
  }

  /**
   *
   * @param id
   * @returns {Observable<R>}
   */
  putSelf(data): Observable<any> {
    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.put(this.usersUrl + 'self', data, options)
      .map(res => res);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.usersUrl + id)
      .map(res => res);
  }

  /**
   *
   * @param id
   * @returns {Observable<R>}
   */
  getUserCourses(id): Observable<Course[]> {
    return this.http.get(this.usersUrl + id + '/courses/')
      .map(res => res.json() as Course[]);
  }



  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
