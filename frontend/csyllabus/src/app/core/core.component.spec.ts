import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ResultCardsComponent } from './result-cards/result-cards.component';
import { ResultCardsComparatorComponent } from './result-cards-comparator/result-cards-comparator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreComponent } from './core.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { ComparatorComponent } from './comparator/comparator.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { FooterComponent } from './../components/footer/footer.component';
import { AboutComponent } from './../components/about/about.component';
import { ContactComponent } from './../components/contact/contact.component';
import { CourseComponent } from '../components/course/course.component';

import { CitiesService } from '../services/cities.service';
import { UniversitiesService } from '../services/universities.service';
import { FacultiesService } from '../services/faculties.service';
import { CoursesService } from '../services/courses.service';
import { CountriesService } from '../services/countries.service';
import { ProgramsService } from '../services/programs.service';
import {of} from "rxjs/observable/of";

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

});
