import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {City} from '../classes/city';


@Injectable()
export class CitiesService {

  citiesUrl = environment.apiUrl + 'cities/';
  countriesUrl = environment.apiUrl + 'countries/';

  constructor(private http: Http) {
  }

  getAllCities(): Observable<City[]> {
    return this.http.get(this.citiesUrl)
      .map(res => res.json().data.items as City[]).catch(this.handleError);
  }

  getCitiesByCountry(countryId): Observable<City[]> {
    return this.http.get(this.countriesUrl + countryId + '/cities')
      .map(res => res.json().data.items as City[]).catch(this.handleError);
  }


  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
