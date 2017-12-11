import { TestBed, inject } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('CoursesService', () => {
  let backend: MockBackend;
  let coursesService: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService, { provide: XHRBackend, useClass: MockBackend }],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('retrieve all the courses by id 0', inject( [CoursesService], ( service ) => {
    return service.getCourseById(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('retrieve all the courses by id program 0', inject( [CoursesService], ( service ) => {
    return service.getCoursesByProgram(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('explore all the courses by id faculty 0 and keyword java', inject( [CoursesService], ( service ) => {
    return service.exploreByFaculty('java', 0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('explore all the courses by id univeristy 0 and keyword java', inject( [CoursesService], ( service ) => {
    return service.exploreByUniversity('java', 0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('explore all the courses by id city 0 and keyword java', inject( [CoursesService], ( service ) => {
    return service.exploreByCity('java', 0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('explore all the courses by id country 0 and keyword java', inject( [CoursesService], ( service ) => {
    return service.exploreByCountry('java', 0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('compare all the courses by id faculty 0', inject( [CoursesService], ( service ) => {
    return service.compareByFaculty(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('compare all the courses by id univeristy 0', inject( [CoursesService], ( service ) => {
    return service.compareByUniversity(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('compare all the courses by id city 0', inject( [CoursesService], ( service ) => {
    return service.compareByCity(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('compare all the courses by id country 0', inject( [CoursesService], ( service ) => {
    return service.compareByCountry(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('should parse object', inject([CoursesService, XHRBackend], (coursesService, backend) => {
    const mockResponse = {
      data: [
        { test: 'courses'
        },
      ]
    }

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response( new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    // coursesService.getCourseById(0).subscribe((res) => {
    // });
    coursesService.getCoursesByProgram(0).subscribe((res) => {
    });
    coursesService.exploreByFaculty('test', 0).subscribe((res) => {
    });
    coursesService.exploreByUniversity('test', 0).subscribe((res) => {
    });
    coursesService.exploreByCity('test', 0).subscribe((res) => {
    });
    coursesService.exploreByCountry('test', 0).subscribe((res) => {
    });
    coursesService.compareByUniversity(0, 0).subscribe((res) => {
    });
    coursesService.compareByCity(0, 0).subscribe((res) => {
    });
    coursesService.compareByCountry(0, 0).subscribe((res) => {
    });
    coursesService.compareByFaculty(0, 0).subscribe((res) => {
    });
  }));

});
