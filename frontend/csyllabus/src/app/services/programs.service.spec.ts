import { TestBed, inject } from '@angular/core/testing';
import { ProgramsService } from './programs.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('ProgramsService', () => {
  let backend: MockBackend;
  let programsService: ProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramsService, { provide: XHRBackend, useClass: MockBackend }],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([ProgramsService], (service: ProgramsService) => {
    expect(service).toBeTruthy();
  }));

  it('retrieves all the programs', inject( [ProgramsService], ( service ) => {
    return service.getAllPrograms().toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('retrieves all the programs by faculty id 0', inject( [ProgramsService], ( service ) => {
    return service.getProgramsByFaculty(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('retrieves all the programs by university id 0', inject( [ProgramsService], ( service ) => {
    return service.getProgramsByUniversity(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('should parse object', inject([ProgramsService, XHRBackend], (programsService, backend) => {
    const mockResponse = {
      data: [
        { test: 'programs'
        },
      ]
    }

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response( new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    programsService.getAllPrograms().subscribe((res) => {
    });
    programsService.getProgramsByFaculty(0).subscribe((res) => {
    });
    programsService.getProgramsByUniversity(0).subscribe((res) => {
    });
  }));

});
