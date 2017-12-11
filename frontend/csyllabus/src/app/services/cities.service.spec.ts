import { TestBed, inject} from '@angular/core/testing';
import { CitiesService } from './cities.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('CitiesService', () => {
  let backend: MockBackend;
  let citiesService: CitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitiesService, { provide: XHRBackend, useClass: MockBackend }],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([CitiesService], (service: CitiesService) => {
    expect(service).toBeTruthy();
  }));

  it('retrieves all the cities', inject( [CitiesService], ( service ) => {
    return service.getAllCities().toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('retrieves all the cities by countries 0', inject( [CitiesService], ( service ) => {
    return service.getCitiesByCountry(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('should parse object', inject([CitiesService, XHRBackend], (citiesService, backend) => {
    const mockResponse = {
      data: [
        { test: 'cities'
        },
      ]
    }

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response( new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    citiesService.getAllCities().subscribe((res) => {
    });

    citiesService.getCitiesByCountry(0).subscribe((res) => {
    });
  }));

});





