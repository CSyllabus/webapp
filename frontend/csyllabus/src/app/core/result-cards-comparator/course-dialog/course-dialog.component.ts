import {Component, OnInit, Inject} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {CoursesService} from '../../../services/courses.service';
import {Course} from '../../../classes/course';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  course: Course;

  constructor(
  private coursesService: CoursesService,
  public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.coursesService.getCourseById(this.data.course_id).subscribe(course => {
      this.course = course;
    });
  }

}

