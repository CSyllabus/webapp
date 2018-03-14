import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {University} from './university';

@Injectable()
export class UniversitiesService {
  universitiesUrl = environment.apiUrl + "universities";
  usersUrl = environment.apiUrl + "users/";


  constructor(private http: Http) {
  }


  getAllUniversities(limit, offset, orderBy, orderDirection, filter):Observable<University[]> {

    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.universitiesUrl + '?limit=' + limit + '&offset=' + offset + '&sortby=' + orderBy + '&sortdirection=' + orderDirection, options)
      .map(res => res.json().data.items as University[]);
  }

  getUniversitiesCount(): Observable<number> {
    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.universitiesUrl, options)
      .map(res => res.json().data.currentItemCount as number);
  }

  getUniversity(id): Observable<University> {
    return this.http.get(this.universitiesUrl +"/"+ id)
      .map(res => res.json().data.items[0] as University);
  }

  deleteUniversity(id: number): Observable<any> {
    return this.http.delete(this.universitiesUrl + id)
      .map(res => res);

  }


  deleteUniversityImage(id: number, img: string): Observable<any> {
    return this.http.delete(this.universitiesUrl + id + '/images/' + img)
      .map(res => res.json());
  }

  universityExisting(id: number, data): Observable<any> {
    return this.http.put(this.universitiesUrl +"/"+ id, data)
      .map(res => res).catch(this.handleError);
  }

  universityNew(data): Observable<any> {

    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.universitiesUrl, data, options)
      .map(res => res).catch(this.handleError);
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
