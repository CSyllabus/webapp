import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {University} from '../classes/university';


@Injectable()
export class UniversitiesService {

  universitiesUrl = environment.apiUrl + 'universities/';
  universitiesAllUrl = environment.apiUrl + 'universitiesall/';
  citiesUrl = environment.apiUrl + 'cities/';
  countriesUrl = environment.apiUrl + 'countries/';
  eventLogUrl = environment.apiUrl + 'event_log/';

  constructor(private http: Http) {
  }

  getAllUniversities(): Observable<University[]> {
    return this.http.get(this.universitiesAllUrl)
      .map(res => res.json().data.items as University[]).catch(this.handleError);
  }

  getUniversityById(universityId): Observable<University> {
    return this.http.get(this.universitiesUrl+universityId)
      .map(res => res.json().data.items[0] as University).catch(this.handleError);
  }

  getUniversitiesByCity(cityId): Observable<University[]> {
    return this.http.get(this.citiesUrl + cityId + '/universities/')
      .map(res => res.json().data.items as University[]).catch(this.handleError);
  }

  getExplore(universityId): Observable<number> {
    return this.http.get(this.eventLogUrl + '?filter=faculty&event_type=explore_by_faculty')
      .map(res => res.json().data.currentItemCount as number).catch(this.handleError);
  }

  getPageHit(universityId): Observable<number> {
    return this.http.get(this.eventLogUrl + '?event_type=page_hit&filter=university/'+universityId)
      .map(res => res.json().data.currentItemCount as number).catch(this.handleError);
  }

  getCompareNormal(universityId): Observable<number> {
    return this.http.get(this.eventLogUrl + '?filter=faculty&event_type=compare_by_faculty')
      .map(res => res.json().data.currentItemCount as number).catch(this.handleError);
  }

  getCompareCrazy(universityId): Observable<number> {
    return this.http.get(this.eventLogUrl + '?filter=faculty&event_type=compare_external_by_faculty')
      .map(res => res.json().data.currentItemCount as number).catch(this.handleError);
  }

  getUniversitiesByCountry(countryId): Observable<University[]> {
    return this.http.get(this.countriesUrl + countryId + '/universities/')
      .map(res => res.json().data.items as University[]).catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}


