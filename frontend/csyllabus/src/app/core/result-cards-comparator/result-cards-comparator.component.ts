import { Component, OnInit, Input } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ComparatorComponent} from '../comparator/comparator.component';
import {Course} from '../../classes/course';

import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
@Component({
  selector: 'app-result-cards-comparator',
  templateUrl: './result-cards-comparator.component.html',
  styleUrls: ['./result-cards-comparator.component.css', './circle.css']
})
export class ResultCardsComparatorComponent implements OnInit {

 @Input() courses: any = [];

 mainCourse: Course;

  constructor(private dialog: MatDialog) { }

openDialog(courseId) {
     this.dialog.open(CourseDialogComponent, {
        width: '', data: {'course_id': courseId}
      });
  }


  ngOnInit() {

  }






}
