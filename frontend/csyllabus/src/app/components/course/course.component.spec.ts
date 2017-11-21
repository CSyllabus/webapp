import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseComponent} from './course.component';
import {CoursesService} from '../../services/courses.service';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {Http, HttpModule} from '@angular/http';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpModule,
        AngularMaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [CoursesService,

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
