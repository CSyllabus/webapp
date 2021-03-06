import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {Country} from '../classes/country';


@Injectable()
export class CountriesService {

  countriesUrl = environment.apiUrl + 'countries/';

  constructor(private http: Http) {
  }

  getAllCountries(): Observable<Country[]> {
    return this.http.get(this.countriesUrl)
      .map(res => res.json().data.items as Country[]).catch(this.handleError);
  }


  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}


