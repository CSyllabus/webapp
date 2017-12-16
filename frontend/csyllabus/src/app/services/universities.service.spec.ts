import {UniversitiesService} from './universities.service';

import {TestBed, inject} from '@angular/core/testing';
import {Response, ResponseOptions, BaseRequestOptions, Http, RequestMethod, ResponseType} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {environment} from '../../environments/environment';

import {University} from '../classes/university';
import {Faculty} from '../classes/faculty';
import {Country} from '../classes/country';
import {City} from '../classes/city';
import {Course} from '../classes/course';
import {Program} from '../classes/program';

class MockError extends Response implements Error {
  name: any;
  message: any;
}

describe('Service: Universities', () => {
  let mockBackend: MockBackend;
  let service: UniversitiesService;
  const city = new City;
  city.id = 0;
  city.countryId = 0;
  city.created = '09122017';
  city.img = 'test.png';
  city.modified = '09122017';
  const university = new University;
  university.id = 0;
  university.cityId = 0;
  university.countryId = 0;
  university.img = 'test.png';
  university.created = '09122017';
  university.name = 'Test University';
  university.modified = '09122017';
  const program = new Program;
  program.created = '09122017';
  program.id = 0;
  program.modified = '09122017';
  program.name = 'Test Program';
  program.studyLevel = '0';
  const course = new Course;
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
  const faculty = new Faculty;
  faculty.img = 'test.png';
  faculty.cityId = 0;
  faculty.created = '09122017';
  faculty.id = 0;
  faculty.modified = '09122017';
  faculty.name = 'Test Faculty';
  faculty.universityId = 0;
  university.faculties = [faculty];
  city.universities = [university];
  const country = new Country;
  country.cities = [city];
  country.created = '09122017';
  country.created = '09122017';
  country.name = 'Test Country';
  country.img = 'test.png';
  country.id = 0;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UniversitiesService,
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
      service = new UniversitiesService(http);
    }));
  it('should  be created ', inject([ UniversitiesService ], (s: UniversitiesService) => {
    expect(s).toBeTruthy();
  }));

  it('retrieves all the universities', inject( [UniversitiesService], ( s ) => {
    return s.getAllUniversities().toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('retrieves all the universities by id city 0', inject( [UniversitiesService], ( s ) => {
    return s.getUniversitiesByCity(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('should call getAllUniversities and return university mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = environment.apiUrl + 'universitiesall/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [university]
          },
        }
      })));
    });
    service.getAllUniversities().subscribe(result => {
      expect(result[0]).toEqual(university);
      done();
    });
  });

  it('should call getUniversitiesByCity id and return university mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = environment.apiUrl + 'cities/' + program.id + '/universities/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [university]
          },
        }
      })));
    });
    service.getUniversitiesByCity(city.id).subscribe(result => {
      expect(result[0]).toEqual(university);
      done();
    });
  });

  it('should call getUniversitiesByCountry id and return university mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = environment.apiUrl + 'countries/' + university.id + '/universities/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [university]
          },
        }
      })));
    });
    service.getUniversitiesByCountry(country.id).subscribe(result => {
      expect(result[0]).toEqual(university);
      done();
    });
  });

  it('should call getAllUniversities and return error', (done) => {
    const body = {
      data: {
        items: [city]
      },
    };

    const opts = {type: ResponseType.Error, status: 404, body: body};
    const responseOpts = new ResponseOptions(opts);

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockError(new MockError(responseOpts));
    });
    service.getAllUniversities().toPromise().then();
    expect(responseOpts).toBeDefined();
    done();
  });

  it('should call getUniversitiesByCity and return error', (done) => {
    const body = {
      data: {
        items: [city]
      },
    };

    const opts = {type: ResponseType.Error, status: 404, body: body};
    const responseOpts = new ResponseOptions(opts);

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockError(new MockError(responseOpts));
    });
    service.getUniversitiesByCity(city.id).toPromise().then();
    expect(responseOpts).toBeDefined();
    done();
  });

});
