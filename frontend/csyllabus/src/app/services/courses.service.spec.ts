import {CoursesService} from './courses.service';

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

describe('Service: Courses', () => {
  let mockBackend: MockBackend;
  let service: CoursesService;
  const exploreUrl = environment.apiUrl + 'explorer';
  const comparatorUrl = environment.apiUrl + 'comparator';

  let keywords = 'test';
  let city = new City;
  city.id = 1;
  city.countryId = 1;
  city.created = '09122917';
  city.img = 'test.png'
  city.modified = '09122017';
  let university = new University;
  university.id = 1;
  university.cityId = 1;
  university.countryId = 1;
  university.img = 'test.png'
  university.created = '09122017';
  university.name = 'Test University';
  university.modified = '09122017';
  let program = new Program;
  program.created = '09122017';
  program.id = 1;
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
  course.id = 1;
  course.name = 'test';
  course.semester = 0;
  course.winsum = 0;
  program.courses = [course, course];
  let faculty = new Faculty;
  faculty.img = 'test.png';
  faculty.cityId = 1;
  faculty.created = '09122017';
  faculty.id = 1;
  faculty.modified = '09122017';
  faculty.name = 'Test Faculty';
  faculty.universityId = 1;
  university.faculties = [faculty];
  city.universities = [university];
  let country = new Country;
  country.cities = [city];
  country.created = '09122017';
  country.created = '09122017';
  country.name = 'Test Country';
  country.img = 'test.png';
  country.id = 1;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesService,
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
      service = new CoursesService(http);
    }
  ));
  it('should  be created ', inject([ CoursesService ], (service: CoursesService) => {
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

  it('should call getAllCourses and return courses mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = environment.apiUrl + 'courses/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course]
          },
        }
      })));
    });
    service.getAllCourses().subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call getCourseById and return course mock', (done) => {
    let course1 = course;
    course1.id = 1;
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = environment.apiUrl + 'courses/' + course.id;
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course1]
          },
        }
      })));
    });
    service.getCourseById(course1.id).subscribe(result => {
      expect(result[0]).not.toBeDefined();
      done();
    });
  });

  it('should call getCoursesByProgram id and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const universitiesUrl = environment.apiUrl + 'programs/' + program.id + '/courses/';
      expect(connection.request.url).toEqual(universitiesUrl);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course]
          },
        }
      })));
    });
    service.getCoursesByProgram(program.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call exploreByFaculty and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = exploreUrl + '?keywords=' + keywords + '&faculty_id=' + faculty.id  + '&/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course]
          },
        }
      })));
    });
    service.exploreByFaculty(keywords, faculty.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call exploreByUniversity and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = exploreUrl + '?keywords=' + keywords + '&university_id=' + university.id  + '&/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course]
          },
        }
      })));
    });
    service.exploreByUniversity(keywords, university.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call exploreByCity and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = exploreUrl + '?keywords=' + keywords + '&city_id=' + city.id  + '&/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course]
          },
        }
      })));
    });
    service.exploreByCity(keywords, city.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call exploreByCountry and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = exploreUrl + '?keywords=' + keywords + '&country_id=' + country.id  + '&/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course]
          },
        }
      })));
    });
    service.exploreByCountry(keywords, country.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call compareByFaculty and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = comparatorUrl + '?course=' + course.id + '&faculty_id=' + course.id  + '&/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course]
          },
        }
      })));
    });
    service.compareByFaculty(country.id, faculty.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call compareByUniversity and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = comparatorUrl + '?course=' + course.id + '&university_id=' + course.id  + '&/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course]
          },
        }
      })));
    });
    service.compareByUniversity(country.id, university.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call compareByCity and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = comparatorUrl + '?course=' + course.id + '&city_id=' + course.id  + '&/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course]
          },
        }
      })));
    });
    service.compareByCity(country.id, city.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

  it('should call compareByCountry and return course mock', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      const url = comparatorUrl + '?course=' + course.id + '&country_id=' + course.id  + '&/';
      expect(connection.request.url).toEqual(url);
      connection.mockRespond(new Response(new ResponseOptions({
        body: {
          data: {
            items: [course, course]
          },
        }
      })));
    });
    service.compareByCountry(country.id, country.id).subscribe(result => {
      expect(result[0]).toEqual(course);
      done();
    });
  });

});
