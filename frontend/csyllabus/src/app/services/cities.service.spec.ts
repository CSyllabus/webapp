import {TestBed, inject, async} from '@angular/core/testing';
import {CitiesService} from './cities.service';

import {Response, ResponseOptions, BaseRequestOptions, Http, RequestMethod, ResponseType} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {environment} from '../../environments/environment';

import {University} from '../classes/university';
import {Faculty} from '../classes/faculty';
import {Country} from '../classes/country';
import {City} from '../classes/city';
import {Course} from '../classes/course';
import {Program} from '../classes/program';

import 'rxjs/add/observable/throw';

class MockError extends Response implements Error {
  name:any
  message: any
}

describe('Service: Cities', () => {
  let mockBackend: MockBackend;
  let service: CitiesService;
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
              items: [city]
            },
          }
      })));
    });
    service.getAllCities().subscribe(result => {
      expect(result[0]).toEqual(city);
      done();
    });
  });

  it('should call getCitiesByCountry and return city mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const countriesUrl = environment.apiUrl + 'countries/' + country.id + '/cities/';
      expect(connection.request.url).toEqual(countriesUrl);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [city]
          },
        }
      })));
    });
    service.getCitiesByCountry(country.id).subscribe(result => {
      expect(result[0]).toEqual(city);
      done();
    });
  });

  it('should call getCitiesByCountry and return error', (done) => {
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
    service.getCitiesByCountry(country.id).toPromise().then();
    expect(responseOpts).toBeDefined();
    done();
    });

  it('should call getAllCities and return error', (done) => {
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
    service.getAllCities().toPromise().then();
    expect(responseOpts).toBeDefined();
    done();
  });


  it('retrieves all the cities', inject( [CitiesService], ( service ) => {
    return service.getAllCities().toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

  it('retrieves all the Cities by country id 0', inject( [CitiesService], ( service ) => {
    return service.getCitiesByCountry(0).toPromise().then( (result) => {
      expect(result.length).toBeGreaterThan(0);
    } );
  }));

});





