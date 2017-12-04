import { Component, OnInit, Input } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {CourseDialogComponent} from './course-dialog/course-dialog.component';
@Component({
  selector: 'app-result-cards',
  templateUrl: './result-cards.component.html',
  styleUrls: ['./result-cards.component.css']
})
export class ResultCardsComponent implements OnInit {

 @Input() courses: any = [];

  constructor(private dialog: MatDialog) { }

  openDialog(course_id){
     this.dialog.open(CourseDialogComponent, {
        width: '', data: {'course_id': course_id}
      });
  }

  ngOnInit() {

  }




}
