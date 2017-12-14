import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of} from 'rxjs/observable/of';
import { By} from '@angular/platform-browser';
import {
  BaseRequestOptions, Http, HttpModule, RequestMethod, Response, ResponseOptions,
  XHRBackend
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { ExplorerComponent } from './explorer.component';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

import { CitiesService } from '../../services/cities.service';
import { UniversitiesService } from '../../services/universities.service';
import { FacultiesService } from '../../services/faculties.service';
import { CoursesService } from '../../services/courses.service';
import { CountriesService } from '../../services/countries.service';
import { ProgramsService } from '../../services/programs.service';

import { Course } from '../../classes/course';
import { City } from '../../classes/city';
import { University } from '../../classes/university';
import { Country } from '../../classes/country';
import { Faculty } from '../../classes/faculty';
import { Program } from '../../classes/program';
import {environment} from "../../../environments/environment";

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

describe('ExplorerComponent', () => {
  // let mockBackend: MockBackend;
  // let serviceCountries: CountriesService;
  // let serviceUniversities: UniversitiesService;
  // let serviceFaculties: FacultiesService;
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;
  let universitiesService: UniversitiesService;
  let facultiesService: FacultiesService;
  let citiesService: CitiesService;
  let countriesService: CountriesService;
  let coursesService: CoursesService;
  let programsService: ProgramsService;

  const keywords = [{ name: 'test'}, { name: 'Test'}];
  const city = new City;
  city.id = 0;
  city.countryId = 1;
  city.created = '09122017';
  city.img = 'test.png';
  city.modified = '09122017';
  const university = new University;
  university.id = 1;
  university.cityId = 0;
  university.countryId = 1;
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
  faculty.cityId = 1;
  faculty.created = '09122017';
  faculty.id = 1;
  faculty.modified = '09122017';
  faculty.name = 'Test Faculty';
  faculty.universityId = 1;
  university.faculties = [faculty];
  city.universities = [university];
  const queryCountry = new Country;
  queryCountry.cities = [city];
  queryCountry.created = '09122017';
  queryCountry.created = '09122017';
  queryCountry.name = 'Test Country';
  queryCountry.img = 'test.png';
  queryCountry.id = 1;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExplorerComponent],
      imports: [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        TestModule,
        AngularMaterialModule,
        CommonModule,
        BrowserAnimationsModule],
      providers: [
        CoursesService,
        CountriesService ,
        ProgramsService ,
        UniversitiesService,
        FacultiesService,
        CitiesService,
        MockBackend,
      ],
    }).compileComponents();
  }));

  beforeEach(inject([ MockBackend, Http ],
    (mb: MockBackend, http: Http) => {
      // mockBackend = mb;
      // serviceCountries = new CountriesService(http);
      // serviceUniversities = new UniversitiesService(http);
      // serviceFaculties = new FacultiesService(http);
      fixture = TestBed.createComponent(ExplorerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      universitiesService = fixture.debugElement.injector.get(UniversitiesService);
      facultiesService = fixture.debugElement.injector.get(FacultiesService);
      citiesService = fixture.debugElement.injector.get(CitiesService);
      countriesService = fixture.debugElement.injector.get(CountriesService);
      coursesService = fixture.debugElement.injector.get(CoursesService);
      programsService = fixture.debugElement.injector.get(ProgramsService);
    }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add test to chip list...', async(() => {
    const field: HTMLInputElement = fixture.debugElement.query(By.css('.input')).nativeElement;

    spyOn(component, 'add').and.callThrough();

    field.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const event: MatChipInputEvent = {value: 'test', input: fixture.debugElement.query(By.css('.input')).nativeElement};

    component.add(event);
    expect(field.textContent.trim()).toBe('Select your destination *');
    expect(component.add).toHaveBeenCalled();
    expect(component.keyword[0].name).toContain('test');
  }));

  it('should add nothing to chip list...', async(() => {
    const field: HTMLInputElement = fixture.debugElement.query(By.css('.input')).nativeElement;

    component.keyword = keywords;

    spyOn(component, 'add').and.callThrough();

    field.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const event: MatChipInputEvent = {value: 'test', input: fixture.debugElement.query(By.css('.input')).nativeElement};

    component.add(event);
    expect(component.add).toHaveBeenCalled();
    expect(component.keyword).not.toContain('test');
  }));


  it('should ngOnInit call', () => {

    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call exploreCourses()', async(() => {

    spyOn(component, 'exploreCourses').and.callThrough();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.exploreCourses).toHaveBeenCalled();
    });
  }));

  it('should service defined ', ()  => {
    expect(coursesService).toBeDefined();
    expect(facultiesService).toBeDefined();
    expect(universitiesService).toBeDefined();
    expect(countriesService).toBeDefined();
    expect(citiesService).toBeDefined();
    expect(programsService).toBeDefined();
  });


  it('should emit on filterFacultiesChange', (done) => {

    const facultyTest = new Faculty;
    facultyTest.img = 'test';
    component.queryFaculty = facultyTest;

    component.backgroundImage.subscribe(foo => {
      expect(foo).toEqual('test');
      done();
    });
    component.filterFacultiesChange();
  });

  it('should filterUniversitiesByCity subscribe ', async(() => {
    const response: University[] = [];
    component.queryCity = city;
    spyOn(universitiesService, 'getUniversitiesByCity').and.returnValue(of(response));

    component.filterUniversitiesByCity();

    fixture.detectChanges();

    expect(component.filteredUniversities).toEqual(response);
  }));

  it('should filterCitiesByCountry subscribe ', async(() => {
    const response: City[] = [];
    component.queryCountry = queryCountry;
    component.queryCountry.id = 1;
    component.queryCountry.img = 'test.png';

    spyOn(citiesService, 'getCitiesByCountry').and.returnValue(of(response));

    component.filterCitiesByCountry();

    fixture.detectChanges();

    expect(component.filteredCities).toEqual(response);
  }));

  it('should filterFacultiesByUniversity subscribe ', async(() => {
    const response: Faculty[] = [];
    component.queryUniversity = university;
    spyOn(facultiesService, 'getFacultiesByUniversity').and.returnValue(of(response));

    component.filterFacultiesByUniversity();

    fixture.detectChanges();

    expect(component.filteredFaculties).toEqual(response);
  }));

  it('should exploreCourses call', () => {

    spyOn(component, 'exploreCourses').and.callThrough();
    component.explorerStarted = true;

    component.exploreCourses();
    expect(component.exploreCourses).toHaveBeenCalled();
  });

  /*it('should getCoursesByFaculty', async(() => {
    const response: Course[] = [];
    component.explorerStarted = true;
    component.keyword = [keywords, keywords];
    component.queryCountry = queryCountry;
    component.queryFaculty = faculty;
    component.queryCity = city;
    component.queryUniversity = university;
    component.queryProgram = program;
    spyOn(coursesService, 'getCoursesByFaculty').and.returnValue(of(response));

    component.exploreCourses();

    fixture.detectChanges();

    expect(coursesService.getCoursesByFaculty).toHaveBeenCalled();
  }));*/

  /* it('should exploreByUniversity', async(() => {
    const response: Course[] = [];
    component.explorerStarted = true;
    component.keyword = [keywords, keywords];
    component.queryCountry = queryCountry;
    component.queryFaculty = null;
    component.queryCity = city;
    component.queryUniversity = university;
    component.queryProgram = program;
    spyOn(coursesService, 'exploreByUniversity').and.returnValue(of(response));

    component.exploreCourses();

    fixture.detectChanges();

    expect(coursesService.exploreByUniversity).toHaveBeenCalled();
  }));*/

  it('should exploreByCountry', async(() => {
    const response: Course[] = [];
    component.explorerStarted = true;
    component.keyword = [keywords, keywords];
    component.queryCountry = queryCountry;
    component.queryFaculty = null;
    component.queryCity = null;
    component.queryUniversity = null;
    component.queryProgram = program;
    spyOn(coursesService, 'exploreByCountry').and.returnValue(of(response));

    component.exploreCourses();

    fixture.detectChanges();

    expect(coursesService.exploreByCountry).toHaveBeenCalled();
  }));

  it('should remove call', () => {
    spyOn(component, 'remove').and.callThrough();
    component.keyword = ['test'];
    const keyword = 'test';
    component.remove(keyword);
    expect(component.keyword).not.toContain('test');
  });

});
