import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExplorerComponent} from './explorer.component';

import {CoreComponent} from '../core.component';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {ResultCardsComponent} from '../result-cards/result-cards.component';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';

import {CitiesService} from '../../services/cities.service';
import {UniversitiesService} from '../../services/universities.service';
import {FacultiesService} from '../../services/faculties.service';
import {CoursesService} from '../../services/courses.service';
import {CountriesService} from '../../services/countries.service';
import {ProgramsService} from '../../services/programs.service';

import {Http, HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';


describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExplorerComponent],
      imports: [

        RouterTestingModule.withRoutes([]),
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule
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
    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
