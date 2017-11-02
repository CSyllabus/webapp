import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

import { City } from './city';


@Injectable()
export class CitiesService {

  citiesUrl = environment.apiUrl + "cities/";

  constructor(private http: Http) { }

  getAllCities(): Observable<City[]> {
   return this.http.get(this.citiesUrl)
     .map(res => res.json() as City[]).catch(this.handleError);
 }


 private handleError(error: any) {
   let errMsg = (error.message) ? error.message :
     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
   console.error(errMsg);
   return Observable.throw(errMsg);
 }


}
