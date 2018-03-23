import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {University} from './university';
import {ErrorService} from "../services/error.service";

@Injectable()
export class UniversitiesService {
  universitiesUrl = environment.apiUrl + "universities";
  usersUrl = environment.apiUrl + "users/";


  constructor(private http: Http, private errorService: ErrorService) {
  }


  getAllUniversities(limit, offset, orderBy, orderDirection, filter):Observable<University[]> {

    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.universitiesUrl + '?limit=' + limit + '&offset=' + offset + '&sortBy=' + orderBy + '&sortDirection=' + orderDirection, options)
      .map(res => res.json().data.items as University[]).catch(this.errorService.handleError);
  }

  getUniversitiesCount(): Observable<number> {
    const headers = new Headers();
    const authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.universitiesUrl, options)
      .map(res => res.json().data.currentItemCount as number).catch(this.errorService.handleError);
  }

  getUniversity(id): Observable<University> {
    return this.http.get(this.universitiesUrl +"/"+ id)
      .map(res => res.json().data.items[0] as University).catch(this.errorService.handleError);
  }

  deleteUniversity(id: number): Observable<any> {
    return this.http.delete(this.universitiesUrl + id)
      .map(res => res).catch(this.errorService.handleError);

  }


  deleteUniversityImage(id: number, img: string): Observable<any> {
    return this.http.delete(this.universitiesUrl + id + '/images/' + img)
      .map(res => res.json()).catch(this.errorService.handleError);
  }

  universityExisting(id: number, data): Observable<any> {
    return this.http.put(this.universitiesUrl +"/"+ id, data)
      .map(res => res).catch(this.errorService.handleError);
  }

  universityNew(data): Observable<any> {

    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.universitiesUrl, data, options)
      .map(res => res).catch(this.errorService.handleError);
  }



}
