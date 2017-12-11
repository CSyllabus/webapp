import {TestBed, inject, async} from '@angular/core/testing';
import {CitiesService} from './cities.service';
import {Response, ResponseOptions, BaseRequestOptions, Http, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {environment} from '../../environments/environment';

describe('Service: Cities', () => {
  let mockBackend: MockBackend;
  let service: CitiesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CitiesService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  beforeEach(inject([ MockBackend, Http ],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      service = new CitiesService(http);
    }));
  it('should  be created ', inject([ CitiesService ], (service: CitiesService) => {
    expect(service).toBeTruthy();
  }));

  it('should call getAllCities and return test name', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let citiesUrl = environment.apiUrl + 'cities/';
      expect(connection.request.url).toEqual(citiesUrl);
      connection.mockRespond(new Response(new ResponseOptions({
          body: {
            data: {
              items: [{
                id: 0,
                countryId: 0,
                created: '09122017',
                img: 'test.png',
                modified: '09122017',
                name: 'test',
                universities: 'test',
              }, ]
            },
          }
      })));
    });
    service.getAllCities().subscribe(result => {
      expect(result[0].name).toEqual('test');
      done();
    });
  });

  it('should call getCitiesByCountry and return test name', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let countriesUrl = environment.apiUrl + 'countries/' + 0 + '/cities/';
      expect(connection.request.url).toEqual(countriesUrl);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [{
              id: 0,
              countryId: 0,
              created: '09122017',
              img: 'test.png',
              modified: '09122017',
              name: 'test',
              universities: 'test',
            }, ]
          },
        }
      })));
    });
    service.getCitiesByCountry(0).subscribe(result => {
      expect(result[0].name).toEqual('test');
      done();
    });
  });

});





