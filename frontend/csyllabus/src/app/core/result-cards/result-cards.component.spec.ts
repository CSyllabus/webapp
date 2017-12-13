import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { HttpModule } from '@angular/http';

import { ResultCardsComponent } from './result-cards.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

import { CoursesService } from '../../services/courses.service';

import { Course } from '../../classes/course';

@NgModule({
  declarations: [CourseDialogComponent],
  entryComponents: [CourseDialogComponent],
  exports: [CourseDialogComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
})
class TestModule { }

describe('ResultCardsComponent', () => {
  let component: ResultCardsComponent;
  let fixture: ComponentFixture<ResultCardsComponent>;
  const courseTest = new Course;
  courseTest.city = 'Test City';
  courseTest.created = '09122017';
  courseTest.description = 'test description';
  courseTest.ects = 0;
  courseTest.englishLevel = 0;
  courseTest.faculty = 'Test Faculty';
  courseTest.id = 0;
  courseTest.name = 'Test course';
  courseTest.semester = 0;
  courseTest.winsum = 0;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultCardsComponent ],
      imports: [

        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        TestModule,
        MatDialogModule,
        MatCardModule,
        HttpModule,
      ],
      providers: [
        CoursesService,
      ],
    });
  }));

  beforeEach(()  => {
    fixture = TestBed.createComponent(ResultCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.courses = [courseTest];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openDialog call with course id 0', () => {
    spyOn(component, 'openDialog').and.callThrough();
    component.openDialog(0);
    expect(component.openDialog).toHaveBeenCalled();
  });

});
