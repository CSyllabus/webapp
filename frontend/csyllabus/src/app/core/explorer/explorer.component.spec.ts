import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExplorerComponent} from './explorer.component';
import {SearchDialogComponent} from './search-dialog/search-dialog.component'
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CitiesService} from '../../services/cities.service';
import {UniversitiesService} from '../../services/universities.service';
import {FacultiesService} from '../../services/faculties.service';
import {CoursesService} from '../../services/courses.service';
import {CountriesService} from '../../services/countries.service';
import {ProgramsService} from '../../services/programs.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {City} from '../../classes/city';
import {University} from '../../classes/university';
import {Country} from '../../classes/country';
import {Faculty} from '../../classes/faculty';
import {MatChipInput, MatChipInputEvent, MatDialogModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {Program} from "../../classes/program";
import {Course} from "../../classes/course";
import {of} from "rxjs/observable/of";

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
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;
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
  course.description = 'test';
  course.ects = 0;
  course.englishLevel = 0;
  course.faculty = 'Test';
  course.id = 0;
  course.name = 'test';
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
  queryCountry.created = '09122017';
  queryCountry.name = 'Test Country';
  queryCountry.img = 'test.png';
  queryCountry.id = 0;

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
        CoursesService, { provide: XHRBackend, useClass: MockBackend },
        CountriesService , { provide: XHRBackend, useClass: MockBackend },
        ProgramsService , { provide: XHRBackend, useClass: MockBackend },
        UniversitiesService, { provide: XHRBackend, useClass: MockBackend },
        FacultiesService, { provide: XHRBackend, useClass: MockBackend },
        CitiesService, { provide: XHRBackend, useClass: MockBackend },
      ],
    }).compileComponents();

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SearchDialogComponent]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerComponent);
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


  it('should ngOnInit call', () => {

    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call exploreCourses()', async(() => {

    spyOn(component, 'exploreCourses').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector('button');
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

    let facultyTest = new Faculty;
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
    let response: City[];
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

  it('should exploreByFaculty', async(() => {
    let response: Course[];
    component.explorerStarted = true;
    component.keyword = [keywords, keywords];
    component.queryCountry = queryCountry;
    component.queryFaculty = faculty;
    component.queryCity = city;
    component.queryUniversity = university;
    component.queryProgram = program;
    spyOn(coursesService, 'exploreByFaculty').and.returnValue(of(response));

    component.exploreCourses();

    fixture.detectChanges();

    expect(coursesService.exploreByFaculty).toHaveBeenCalled();
  }));

  it('should exploreByUniversity', async(() => {
    let response: Course[];
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
  }));

  it('should exploreByCity', async(() => {
    let response: Course[];
    component.explorerStarted = true;
    component.keyword = [keywords, keywords];
    component.queryCountry = queryCountry;
    component.queryFaculty = null;
    component.queryCity = city;
    component.queryUniversity = null;
    component.queryProgram = program;
    spyOn(coursesService, 'exploreByCity').and.returnValue(of(response));

    component.exploreCourses();

    fixture.detectChanges();

    expect(coursesService.exploreByCity).toHaveBeenCalled();
  }));

  it('should exploreByCountry', async(() => {
    let response: Course[];
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
    let keyword = 'test';
    component.remove(keyword);
    expect(component.keyword).not.toContain('test');
  });

  it('should add call', () => {
  });

  it('should add', () => {
    /*component.keyword = keywords;
    let newDiv = document.createElement('test');
    let newContent = document.createTextNode('test');
    newDiv.appendChild(newContent);
    let event: MatChipInputEvent;
    event.input = <HTMLInputElement>document.getElementById('test1');
    event.value = 'test';
    spyOn(component, 'add').and.callThrough();
    component.add(event);
    expect(component.add ).toHaveBeenCalled();*/
  });

});
