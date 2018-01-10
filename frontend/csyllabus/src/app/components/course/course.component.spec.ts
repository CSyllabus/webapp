import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CourseComponent } from './course.component';
import { CoursesService } from '../../services/courses.service';

import { SocialLoginModule } from "angular4-social-login";

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

});
