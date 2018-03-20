import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';
import {Country} from '../classes/country';
import {ErrorService} from "./error.service";

@Injectable()
export class CountriesService {
  countriesUrl = environment.apiUrl + 'countries/';

  constructor(private http: Http, private errorService: ErrorService) {
  }

  getAllCountries(): Observable<Country[]> {
    return this.http.get(this.countriesUrl)
      .map(res => res.json().data.items as Country[]).catch(this.errorService.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}


