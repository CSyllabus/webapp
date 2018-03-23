import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions} from '@angular/http';
import {environment} from "../../environments/environment";

@Injectable()
export class EventsService {
  private eventsUrl = environment.apiUrl + 'event_log/';

  constructor(private http: Http) {
  }


  public emitEvent(data): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.eventsUrl, data, options)
      .map(res => res).catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
