import {FacultiesService} from './faculties.service';

import {TestBed, inject, async} from '@angular/core/testing';
import {Response, ResponseOptions, BaseRequestOptions, Http, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {environment} from '../../environments/environment';

import {University} from '../classes/university';
import {Faculty} from '../classes/faculty';
import {Country} from '../classes/country';
import {City} from '../classes/city';
import {Course} from '../classes/course';
import {Program} from '../classes/program';

describe('Service: Faculties', () => {
  let mockBackend: MockBackend;
  let service: FacultiesService;
  let city = new City;
  city.id = 0;
  city.countryId = 0;
  city.created = '09122017';
  city.img = 'test.png'
  city.modified = '09122017';
  let university = new University;
  university.id = 0;
  university.cityId = 0;
  university.countryId = 0;
  university.img = 'test.png'
  university.created = '09122017';
  university.name = 'Test University';
  university.modified = '09122017';
  let program = new Program;
  program.created = '09122017';
  program.id = 0;
  program.modified = '09122017';
  program.name = 'Test Program';
  program.studyLevel = '0';
  let course = new Course;
  course.city = 'Test City';
  course.created = '09122017';
  course.description = 'test';
  course.ects = 0;
  course.englishLevel = 0;
  course.faculty = 'Test';
  course.id = 0;
  course.name = 'test';
  course.semester = 0;
  course.winsum = 0;
  program.courses = [course, course];
  let faculty = new Faculty;
  faculty.img = 'test.png';
  faculty.cityId = 0;
  faculty.created = '09122017';
  faculty.id = 0;
  faculty.modified = '09122017';
  faculty.name = 'Test Faculty';
  faculty.universityId = 0;
  university.faculties = [faculty];
  city.universities = [university];
  let country = new Country;
  country.cities = [city];
  country.created = '09122017';
  country.created = '09122017';
  country.name = 'Test Country';
  country.img = 'test.png';
  country.id = 0;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FacultiesService,
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
      service = new FacultiesService(http);
    }
  ));
  it('should  be created ', inject([ FacultiesService ], (service: FacultiesService) => {
    expect(service).toBeTruthy();
  }));

  it('should call getAllCountries and return faculty mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const facultiesUrl = environment.apiUrl + 'faculties/';
      expect(connection.request.url).toEqual(facultiesUrl);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [faculty]
          },
        }
      })));
    });
    service.getAllFaculties().subscribe(result => {
      expect(result[0]).toEqual(faculty);
      done();
    });
  });

  it('should call getFacultiesByUniversity id and return faculty mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const universitiesUrl = environment.apiUrl + 'universities/' + university.id + '/faculties/';
      expect(connection.request.url).toEqual(universitiesUrl);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [faculty]
          },
        }
      })));
    });
    service.getFacultiesByUniversity(university.id).subscribe(result => {
      expect(result[0]).toEqual(faculty);
      done();
    });
  });

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

});
