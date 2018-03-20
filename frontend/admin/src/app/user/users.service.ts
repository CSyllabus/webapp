import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user';
import {Course} from '../course/course';
import {environment} from '../../environments/environment';
import {ErrorService} from "../services/error.service";

@Injectable()
export class UsersService {
  usersUrl = environment.apiUrl + "users/";

  constructor(private http: Http, private errorService: ErrorService) {
  }


  getAllUsers(limit, offset, orderBy, orderDirection, filter): Observable<User[]> {
    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.usersUrl + '?limit=' + limit + '&offset=' + offset + '&sortby=' + orderBy + '&sortdirection=' + orderDirection, options)
      .map(res => res.json().data.items as User[]).catch(this.errorService.handleError);
  }

  getUsersCount(): Observable<number> {
    return this.http.get(this.usersUrl)
      .map(res => res.json().data.currentItemCount as number).catch(this.errorService.handleError);
  }

  getUser(id): Observable<User> {
    return this.http.get(this.usersUrl + id)
      .map(res => res.json().data.items[0] as User).catch(this.errorService.handleError);
  }

  getSelf(): Observable<User> {

    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.usersUrl + 'self', options)
      .map(res => res.json().data.items[0] as User).catch(this.errorService.handleError);
  }

  checkUser(): Observable<any> {
    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});


    return this.http.get(this.usersUrl + 'check', options)
      .map(res => res.json().data.admin as boolean).catch(this.errorService.handleError);

  }

  checkEmail(email, username): Observable<any> {
    return this.http.get(this.usersUrl + 'check_email?email=' + email+"&username="+username)
      .map(res => res.json().value as boolean).catch(this.errorService.handleError);
  }

  checkUsername(username): Observable<any> {
    return this.http.get(this.usersUrl + 'check_username?username=' + username)
      .map(res => res.json().value as boolean).catch(this.errorService.handleError);

  }

  checkUserCourse(courseId): Observable<any> {
    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.usersUrl + 'check/' + courseId, options)
      .map(res => res.json().data.admin as boolean).catch(this.errorService.handleError);

  }

  putUser(id: number, data): Observable<User> {
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.put(this.usersUrl + id, data, options)
      .map(res => res).catch(this.errorService.handleError);
  }

  postUser(data): Observable<User> {
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.usersUrl, data, options)
      .map(res => res).catch(this.errorService.handleError);
  }

  putSelf(data): Observable<any> {
    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.put(this.usersUrl + 'self', data, options)
      .map(res => res).catch(this.errorService.handleError);
  }

  deleteUser(id: number): Observable<any> {
    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});
    return this.http.delete(this.usersUrl + id, options)
      .map(res => res).catch(this.errorService.handleError);
  }

  getUserCourses(id): Observable<Course[]> {
    return this.http.get(this.usersUrl + id + '/courses/')
      .map(res => res.json() as Course[]).catch(this.errorService.handleError);
  }
}
