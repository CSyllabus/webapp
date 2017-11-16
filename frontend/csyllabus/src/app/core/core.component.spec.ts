import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoreComponent} from './core.component';
import {ExplorerComponent} from './explorer/explorer.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {ResultCardsComponent} from './result-cards/result-cards.component';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';

import { CitiesService } from '../services/cities.service';
import { UniversitiesService } from '../services/universities.service';
import { FacultiesService } from '../services/faculties.service';
import { CoursesService } from '../services/courses.service';
import { CountriesService } from '../services/countries.service';
import { ProgramsService } from '../services/programs.service';

import {Http, HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RouterTestingModule} from '@angular/router/testing';

import {CourseComponent} from '../components/course/course.component';
import {ActivatedRoute} from '@angular/router';

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoreComponent, ExplorerComponent, ResultCardsComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
      ],
      providers: [
        CitiesService,
        UniversitiesService,
        FacultiesService,
        CoursesService,
        CountriesService,
        ProgramsService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
