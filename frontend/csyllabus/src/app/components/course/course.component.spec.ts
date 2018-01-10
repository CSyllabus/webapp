import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/observable/of';

import { CourseComponent } from './course.component';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../classes/course';

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";

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
        SocialLoginModule,
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

  /*it('should create', () => {
   // expect(component).toBeTruthy();
  });

  it('should ngOnInit subscribe ',  inject( [CoursesService], ( service ) => {
    const response = new Course;

    spyOn(service, 'getCourseById').and.returnValue(of(response));

    component.ngOnInit();

    fixture.detectChanges();

    // expect(component.course).toEqual(response);
  }));*/
});
