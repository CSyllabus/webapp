import { async, fakeAsync, tick , inject , ComponentFixture , TestBed} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComparatorComponent } from './comparator.component';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UniversitiesService} from '../../services/universities.service';
import {FacultiesService} from '../../services/faculties.service';
import {CoursesService} from '../../services/courses.service';
import {CountriesService} from '../../services/countries.service';
import {ProgramsService} from '../../services/programs.service';
import {CitiesService} from '../../services/cities.service';
import { of } from 'rxjs/observable/of';
import {SearchDialogComponent} from './search-dialog/search-dialog.component';

import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { HttpModule, XHRBackend, BaseRequestOptions, Http } from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {City} from '../../classes/city';
import {University} from '../../classes/university';
import {Country} from '../../classes/country';
import {Faculty} from '../../classes/faculty';
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {Program} from "../../classes/program";
import {Course} from "../../classes/course";
import {MatDialogModule} from "@angular/material";

@NgModule({
  declarations: [SearchDialogComponent],
  entryComponents: [SearchDialogComponent],
  exports: [SearchDialogComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
})
class TestModule { }

describe('ComparatorComponent', () => {
  let component: ComparatorComponent;
  let fixture: ComponentFixture<ComparatorComponent>;
  let universitiesService: UniversitiesService;
  let facultiesService: FacultiesService;
  let citiesService: CitiesService;
  let countriesService: CountriesService;
  let coursesService: CoursesService;
  let programsService: ProgramsService;

  let keywords = [{ name: 'test'}, { name: 'Test'}];
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
  course.description = 'test description';
  course.ects = 0;
  course.englishLevel = 0;
  course.faculty = 'Test Faculty';
  course.id = 0;
  course.name = 'Test course';
  course.semester = 0;
  course.winsum = 0;
  program.courses = [course,course];
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
  let queryCountry = new Country;
  queryCountry.cities = [city];
  queryCountry.created = '09122017';
  queryCountry.name = 'Test Country';
  queryCountry.img = 'test.png';
  queryCountry.id = 0;
  queryCountry.modified = '09122017';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComparatorComponent],
      imports: [
        HttpModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        TestModule,
        AngularMaterialModule,
        CommonModule,
        BrowserAnimationsModule],
      providers: [
        CoursesService, { provide: XHRBackend, useClass: MockBackend },
        CountriesService , { provide: XHRBackend, useClass: MockBackend },
        ProgramsService , { provide: XHRBackend, useClass: MockBackend },
        UniversitiesService, { provide: XHRBackend, useClass: MockBackend },
        FacultiesService, { provide: XHRBackend, useClass: MockBackend },
        CitiesService, { provide: XHRBackend, useClass: MockBackend },
        MockBackend,
      ],

    }).compileComponents();

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SearchDialogComponent]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    universitiesService = fixture.debugElement.injector.get(UniversitiesService);
    facultiesService = fixture.debugElement.injector.get(FacultiesService);
    citiesService = fixture.debugElement.injector.get(CitiesService);
    countriesService = fixture.debugElement.injector.get(CountriesService);
    coursesService = fixture.debugElement.injector.get(CoursesService);
    programsService = fixture.debugElement.injector.get(ProgramsService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call compareCourses async', async(() => {

    spyOn(component, 'compareCourses').and.callThrough();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.compareCourses).toHaveBeenCalled();
    });
  }));

  it('should call compareCourses fakeAsync', fakeAsync( () => {
    fixture.detectChanges();
    spyOn(component, 'compareCourses').and.callThrough(); // method attached to the click.
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    expect(component.compareCourses).toHaveBeenCalled();

  }));

  it('should emit on filterFacultiesChange', (done) => {

    let facultyTest = new Faculty;
    facultyTest.img = 'test';
    component.queryFaculty = facultyTest;

    component.backgroundImage.subscribe(foo => {
      expect(foo).toEqual('test');
      done();
    });
    component.filterFacultiesChange();
  });

  it('should compareCourses call', () => {

    spyOn(component, 'compareCourses').and.callThrough();

    component.compareCourses();
    expect(component.compareCourses).toHaveBeenCalled();
  });

  it('should construct CourseService', async(inject(
    [CoursesService, MockBackend], (service, mockBackend) => {

      expect(service).toBeDefined();
    })));

  it('should construct universitiesService', async(inject(
    [UniversitiesService, MockBackend], (service, mockBackend) => {

      expect(service).toBeDefined();
    })));

  it('should construct facultiesService', async(inject(
    [FacultiesService, MockBackend], (service, mockBackend) => {

      expect(service).toBeDefined();
    })));

  it('should construct citiesService', async(inject(
    [CitiesService, MockBackend], (service, mockBackend) => {

      expect(service).toBeDefined();
    })));

  it('should construct countriesService', async(inject(
    [CountriesService, MockBackend], (service, mockBackend) => {

      expect(service).toBeDefined();
    })));

  it('should service defined ', ()  => {
    expect(coursesService).toBeDefined();
    expect(facultiesService).toBeDefined();
    expect(universitiesService).toBeDefined();
    expect(countriesService).toBeDefined();
    expect(citiesService).toBeDefined();
    expect(programsService).toBeDefined();
  });

  it('should call filterProgramsByHomeFaculty',() => {
    component.queryHomeFaculty = faculty;
    spyOn(component, 'filterProgramsByHomeFaculty')
      .and.returnValue(component.filteredHomePrograms)
      .and.callThrough();

    component.filterProgramsByHomeFaculty();

    expect(component.filterProgramsByHomeFaculty).toHaveBeenCalled();
  });

  it('should filterCitiesByCountry subscribe ', () => {
    let response: City[];

    spyOn(citiesService, 'getCitiesByCountry').and.returnValue(of(response)).and.callThrough();

    component.queryCountry = queryCountry;
    component.queryCountry.id = 1;
    component.queryCountry.img = 'test.png';

    component.filterCitiesByCountry();
    if (component.queryCountry && component.queryCountry.id) {
      expect(component.queryCountry).toBeDefined();
    }
    expect(component.queryCountry).toBeDefined();
    expect(component.queryCountry.id).toEqual(1);
    fixture.detectChanges();

    expect(component.filteredCities).toEqual(response);
  });


  it('should filterProgramsByHomeFaculty subscribe ', async(() => {
    const response: Program[] = [];
    component.queryHomeFaculty = faculty;
    spyOn(programsService, 'getProgramsByFaculty').and.returnValue(of(response));

    component.filterProgramsByHomeFaculty();

    fixture.detectChanges();

    expect(component.filteredHomePrograms).toEqual(response);
  }));

  it('should filterCoursesByHomeProgram subscribe ', async(() => {
    const response: Course[] = [];
    component.queryHomeProgram = program;
    spyOn(coursesService, 'getCoursesByProgram').and.returnValue(of(response));

    component.filterCoursesByHomeProgram();

    fixture.detectChanges();

    expect(component.filteredHomeCourses).toEqual(response);
  }));

  it('should filterFacultiesByUniversity subscribe ', async(() => {
    const response: Faculty[] = [];
    component.queryUniversity = university;
    spyOn(facultiesService, 'getFacultiesByUniversity').and.returnValue(of(response));

    component.filterFacultiesByUniversity();

    fixture.detectChanges();

    expect(component.filteredFaculties).toEqual(response);
  }));

  it('should filterFacultiesByHomeUniversity Programs subscribe ', async(() => {
    let responseProgram: Program[];
    component.queryHomeUniversity = university;
    component.queryHomeUniversity.id = 0;

    spyOn(programsService, 'getProgramsByUniversity').and.returnValue(of(responseProgram));

    component.filterFacultiesByHomeUniversity();

    fixture.detectChanges();

    expect(component.filteredHomePrograms).toEqual(responseProgram);
  }));

  it('should filterFacultiesByHomeUniversity Faculties subscribe ', async(() => {
    let response: Faculty[];
    component.queryHomeUniversity = university;
    component.queryHomeUniversity.id = 0;

    spyOn(facultiesService, 'getFacultiesByUniversity').and.returnValue(of(response));

    component.filterFacultiesByHomeUniversity();

    //fixture.detectChanges();

    expect(component.filteredHomeFaculties).toEqual(response);
  }));

  it('should filterUniversitiesByCity subscribe ', async(() => {
    const response: University[] = [];
    component.queryCity = city;
    spyOn(universitiesService, 'getUniversitiesByCity').and.returnValue(of(response));

    component.filterUniversitiesByCity();

    fixture.detectChanges();

    expect(component.filteredUniversities).toEqual(response);
  }));

  it('should filterCitiesByCountry subscribe ', async(() => {
    let response: City[];
    component.queryCountry = queryCountry;
    spyOn(citiesService, 'getCitiesByCountry').and.returnValue(of(response));

    component.filterCitiesByCountry();

    fixture.detectChanges();

    expect(component.filteredCities).toEqual(response);
  }));

  it('should compareCourses call with Faculty Single Course', async(() => {
    let response: Course[];
    //component.listCourses = [course];
    //component.listCoursesIDs = [0];
    component.queryHomeCourse = course;
    component.comparatorStarted = true;
    component.queryFaculty = faculty;
    spyOn(coursesService, 'compareByFaculty').and.returnValue(of(response));

    component.compareCourses();

    fixture.detectChanges();

    //expect(component.multiCourses).toContain(response);
    expect(coursesService.compareByFaculty).toHaveBeenCalled();
  }));

  /*it('should compareCourses call with Faculty Multi Courses', async(() => {
    let response: Course[];
    let course1 = course;
    course.id = 1;

    component.listCourses = [course, course1];
    component.listCoursesIDs = [0, 1];
    component.comparatorStarted = true;
    component.queryFaculty = faculty;
    spyOn(coursesService, 'compareByFaculty').and.returnValue(of(response));

    component.compareCourses();

    fixture.detectChanges();

    expect(component.multiCourses).toContain(response);
  }));*/

  it('should compareCourses call with University Single Course', async(() => {
    let response: Course[];
    //component.listCourses = [course];
    //component.listCoursesIDs = [0];

    component.queryHomeCourse = course;
    component.comparatorStarted = true;
    component.queryUniversity = university;
    spyOn(coursesService, 'compareByUniversity').and.returnValue(of(response));

    component.compareCourses();

    fixture.detectChanges();

    //expect(component.multiCourses).toContain(response);
    expect(coursesService.compareByUniversity).toHaveBeenCalled();
  }));

  /*it('should compareCourses call with University Multi Courses', async(() => {
    let response: Course[];
    let course1 = course;
    course.id = 1;

    //component.listCourses = [course, course1];
    //component.listCoursesIDs = [0, 1];
    component.comparatorStarted = true;
    component.queryUniversity = university;
    spyOn(coursesService, 'compareByUniversity').and.returnValue(of(response));

    component.compareCourses();

    fixture.detectChanges();

    expect(component.multiCourses).toContain(response);
  }));*/

  it('should compareCourses call with City Single Course', async(() => {
    let response: Course[];
    //component.listCourses = [course];
    //component.listCoursesIDs = [0];
    component.queryHomeCourse = course;
    component.comparatorStarted = true;
    component.queryCity = city;
    spyOn(coursesService, 'compareByCity').and.returnValue(of(response));

    component.compareCourses();

    fixture.detectChanges();

    //expect(component.multiCourses).toContain(response);
    expect(coursesService.compareByCity).toHaveBeenCalled();
  }));

  /* it('should compareCourses call with City Multi Courses', async(() => {
     let response: Course[];
     let course1 = course;
     course.id = 1;

     //component.listCourses = [course, course1];
     //component.listCoursesIDs = [0, 1];
     component.comparatorStarted = true;
     component.queryCity = city;
     spyOn(coursesService, 'compareByCity').and.returnValue(of(response));

     component.compareCourses();

     fixture.detectChanges();

     expect(component.multiCourses).toContain(response);
   }));*/

  it('should compareCourses call with Country Single Course', async(() => {
    let response: Course[];
    //component.listCourses = [course];
    //component.listCoursesIDs = [0];
    component.queryHomeCourse = course;
    component.comparatorStarted = true;
    component.queryCountry = queryCountry;
    spyOn(coursesService, 'compareByCountry').and.returnValue(of(response));

    component.compareCourses();

    fixture.detectChanges();

    //expect(component.multiCourses).toContain(response);
    expect(coursesService.compareByCountry).toHaveBeenCalled();
  }));

  /*it('should compareCourses call with Country Multi Courses', async(() => {
    let response: Course[];
    let course1 = course;
    course.id = 1;

    //component.listCourses = [course, course1];
    //component.listCoursesIDs = [0, 1];
    component.comparatorStarted = true;
    component.queryCountry = queryCountry;
    spyOn(coursesService, 'compareByCountry').and.returnValue(of(response));

    component.compareCourses();

    fixture.detectChanges();

    expect(component.multiCourses).toContain(response);
  }));*/

});


