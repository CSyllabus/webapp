import {TestBed, inject, ComponentFixture, async} from '@angular/core/testing';
import { UniversitiesService } from './universities.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('UniversitiesService', () => {
  let backend: MockBackend;
  let universitiesService: UniversitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversitiesService, { provide: XHRBackend, useClass: MockBackend }],
      imports: [ HttpModule ]
    });
  })

  it('should be created', inject([UniversitiesService], (service: UniversitiesService) => {
    expect(service).toBeTruthy();
  }));

  it('retrieves all the universities', inject( [UniversitiesService], ( service ) => {
    return service.getAllUniversities().toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('retrieves all the universities by id city 0', inject( [UniversitiesService], ( service ) => {
    return service.getUniversitiesByCity(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('should parse object', inject([UniversitiesService, XHRBackend], (universitiesService, backend) => {
    const mockResponse = {
      data: [
        { test: 'universities'
        },
      ]
    }

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response( new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    universitiesService.getAllUniversities().subscribe((res) => {
    });
    universitiesService.getUniversitiesByCity(0).subscribe((res) => {
    });

  }));

});
