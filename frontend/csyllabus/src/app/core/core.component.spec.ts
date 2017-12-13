import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoreComponent} from './core.component';
import {ExplorerComponent} from './explorer/explorer.component';
import {ComparatorComponent} from './comparator/comparator.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {ResultCardsComponent} from './result-cards/result-cards.component';
import {ResultCardsComparatorComponent} from './result-cards-comparator/result-cards-comparator.component';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { FooterComponent } from './../components/footer/footer.component';
import { AboutComponent } from './../components/about/about.component';
import { ContactComponent } from './../components/contact/contact.component';
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
      declarations: [
        CoreComponent,
        ExplorerComponent,
        ResultCardsComponent,
        ResultCardsComparatorComponent,
        NavbarComponent,
        ComparatorComponent,
        CourseComponent,
        FooterComponent,
        AboutComponent,
        ContactComponent,

      ],
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

  it('should fetchExplorerResult call', () => {

    spyOn(component, 'fetchExplorerResult').and.callThrough();
    component.fetchExplorerResult({ srcElement: { value: 'test' } });
    expect(component.fetchExplorerResult).toHaveBeenCalled();
  });

  it('should fetchComparatorResult call', () => {

    spyOn(component, 'fetchComparatorResult').and.callThrough();
    component.fetchComparatorResult({ srcElement: { value: 'test' } });
    expect(component.fetchComparatorResult).toHaveBeenCalled();
  });

  it('should changeResultCard call with event index different to 1', () => {

    const event = {index: 0};
    spyOn(component, 'changeResultCard').and.callThrough();
    component.changeResultCard(event);
    expect(component.explorerTab ).toEqual(true);
  });

  it('should changeResultCard call with event index different to 0', () => {

    const event = {index: 1};
    spyOn(component, 'changeResultCard').and.callThrough();
    component.changeResultCard(event);
    expect(component.explorerTab ).toEqual(false);
  });
});
