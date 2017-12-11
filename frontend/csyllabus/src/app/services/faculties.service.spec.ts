import { TestBed, inject } from '@angular/core/testing';
import { FacultiesService } from './faculties.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('FacultiesService', () => {
  let backend: MockBackend;
  let facultiesService: FacultiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultiesService, { provide: XHRBackend, useClass: MockBackend }],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([FacultiesService], (service: FacultiesService) => {
    expect(service).toBeTruthy();
  }));

  it('retrieves all the faculties', inject( [FacultiesService], ( service ) => {
    return service.getAllFaculties().toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('retrieves all the faculties by university id 0', inject( [FacultiesService], ( service ) => {
    return service.getFacultiesByUniversity().toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('should parse object', inject([FacultiesService, XHRBackend], (facultiesService, backend) => {
    const mockResponse = {
      data: [
        { test: 'faculties'
        },
      ]
    }

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response( new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    facultiesService.getAllFaculties().subscribe((res) => {
    });

    facultiesService.getFacultiesByUniversity(0).subscribe((res) => {
    });
  }));
});
