import {async, inject, TestBed} from '@angular/core/testing';
import { CourseDialogComponent } from './course-dialog.component';
import { MatDialog} from '@angular/material';
import {AngularMaterialModule} from '../../../angular-material/angular-material.module';
import {MatDialogModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoursesService} from '../../../services/courses.service';
import {HttpModule} from '@angular/http';
import {of} from "rxjs/observable/of";
import {Course} from '../../../classes/course';

@NgModule({
  declarations: [CourseDialogComponent],
  entryComponents: [CourseDialogComponent],
  exports: [CourseDialogComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpModule,
  ],
  providers: [
    CoursesService,
    HttpModule,
  ],
})
class TestModule { }

describe('CourseDialogComponent explorer', () => {
  let component: CourseDialogComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, TestModule, AngularMaterialModule, CommonModule, BrowserAnimationsModule]
    });
  });

  beforeEach(()  => {
    dialog = TestBed.get(MatDialog);

    let dialogRef = dialog.open(CourseDialogComponent);

    component = dialogRef.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit call', async() => {

    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('retrieve all the courses by id 0', inject( [CoursesService], ( service ) => {
    spyOn(component, 'ngOnInit').and.callThrough();
    return service.getCourseById(0).toPromise().then( (result) => {
      component.ngOnInit();
      expect(component.course).toEqual(result);
    });
  }));

  it('should ngOnInit subscribe ',  inject( [CoursesService], ( service ) => {
    let response: Course;
    let data = [{course_id: 0}];

    spyOn(service, 'getCourseById').and.returnValue(of(response));
    component.data = data;
    component.data.course_id = 0;

    component.ngOnInit();

    expect(component.course).toEqual(response);
  }));

  it('should onNoClick call', () => {
    spyOn(component, 'onNoClick').and.callThrough();
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();
  });

});


