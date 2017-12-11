import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import { CountriesService } from './countries.service';
import { MockBackend } from '@angular/http/testing';
import {CitiesService} from "./cities.service";

describe('CountriesService', () => {
  let backend: MockBackend;
  let countriesService: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesService, { provide: XHRBackend, useClass: MockBackend }],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([CountriesService], (service: CountriesService) => {
    expect(service).toBeTruthy();
  }));

  it('retrieves all the countries', inject( [CountriesService], ( service ) => {
    return service.getAllCountries().toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('should parse object', inject([CountriesService, XHRBackend], (citiesService, backend) => {
    const mockResponse = {
      data: [
        {test: 'countries'},
      ]
    }

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response( new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    citiesService.getAllCountries().subscribe((res) => {
    });

  }));

});



