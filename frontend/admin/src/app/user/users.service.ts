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
  getAllUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(res => res.json() as User[]);
  }

  /**
   *
   * @returns {Observable<R>}
   */
  getUsersCount(): Observable<number> {
    return this.http.get(this.usersUrl + 'count')
      .map(res => res.json() as number);
  }

  /**
   *
   * @param id
   * @returns {Observable<R>}
   */
  getUser(id): Observable<User> {
    return this.http.get(this.usersUrl + id)
      .map(res => res.json() as User);
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

  /**
   *
   * @param id
   * @returns {Observable<R>}
   */
  getUserCourses(id): Observable<Course[]> {
    return this.http.get(this.usersUrl + id + '/courses/')
      .map(res => res.json() as Course[]);
  }

}
