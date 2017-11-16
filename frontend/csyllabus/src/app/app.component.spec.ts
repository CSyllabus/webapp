import {TestBed, async} from '@angular/core/testing';
import {CitiesService} from './services/cities.service';
import {UniversitiesService} from './services/universities.service';
import {FacultiesService} from './services/faculties.service';
import {ProgramsService} from './services/programs.service';
import {CoursesService} from './services/courses.service';
import {CountriesService} from './services/countries.service';
import {AppComponent} from './app.component';
import {Http, HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        CitiesService,
        UniversitiesService,
        FacultiesService,
        ProgramsService,
        CoursesService,
        CountriesService
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'CSyllabus'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('CSyllabus');
  }));

  /*it('should render title in a h1 tag', async(() => {
   const fixture = TestBed.createComponent(AppComponent);
   fixture.detectChanges();
   const compiled = fixture.debugElement.nativeElement;
   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
   }));*/
});
