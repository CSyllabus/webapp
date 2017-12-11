import {ProgramsService} from './programs.service';

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

describe('Service: Programs', () => {
  let mockBackend: MockBackend;
  let service: ProgramsService;
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
        ProgramsService,
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
      service = new ProgramsService(http);
    }
  ));
  it('should  be created ', inject([ ProgramsService ], (service: ProgramsService) => {
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

  it('should call getAllPrograms and return program mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = environment.apiUrl + 'programs/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [program]
          },
        }
      })));
    });
    service.getAllPrograms().subscribe(result => {
      expect(result[0]).toEqual(program);
      done();
    });
  });

  it('should call getProgramsByFaculty id and return program mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = environment.apiUrl + 'faculties/' + faculty.id + '/programs/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [program]
          },
        }
      })));
    });
    service.getProgramsByFaculty(faculty.id).subscribe(result => {
      expect(result[0]).toEqual(program);
      done();
    });
  });

  it('should call getProgramsByUniversity id and return program mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = environment.apiUrl + 'universities/' + faculty.id + '/programs/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [program]
          },
        }
      })));
    });
    service.getProgramsByUniversity(university.id).subscribe(result => {
      expect(result[0]).toEqual(program);
      done();
    });
  });

});
