import {Component, OnInit, Inject} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {CoursesService} from '../../services/courses.service';
import {Course} from '../../classes/course';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})

/**
 * CourseDialogComponent object displaying the relative informations
 * from a course id
 * <p>
 * @author CSyllabus Team
 */
export class CourseDialogComponent implements OnInit {
  /**
   * The {@link Course} instance representing the course displayed
   */
  course: Course;

  /**
   * @constructor create CourseDialogComponent object.
   * @param dialogRef {@link MatDialogRef<CourseDialogComponent>} instance representing dialogRef.
   * @param data {@link MAT_DIALOG_DATA} instance representing data.
   * @param coursesService The {@link CoursesService} service to subscribe CoursesService.
   */
  constructor(
  private coursesService: CoursesService,
  public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  /**
   * onNoClick close dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * ngOnInit Sets the {@link Course} instance representing course
   * given by his id.
   */
  ngOnInit() {
    this.coursesService.getCourseById(this.data.course_id).subscribe(course => {
      this.course = course;
    });
  }

}

