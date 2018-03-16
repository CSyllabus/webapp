import { Component, OnInit, Input } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CoursesService} from '../../services/courses.service';

import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
@Component({
  selector: 'app-result-cards',
  templateUrl: './result-cards.component.html',
  styleUrls: ['./result-cards.component.css']
})
export class ResultCardsComponent implements OnInit {

 @Input() courses: any = [];
  orderBy:String;
 page = 1;
  constructor(private dialog: MatDialog) { }

  openDialog(course_id){
     this.dialog.open(CourseDialogComponent, {
        width: '', data: {'course_id': course_id}
      });
  }

  orderResults(){
   if (this.orderBy === 'nameAsc') {
    this.courses = this.courses.sort(function(obj1,obj2){
      let name1 = obj1.name.toUpperCase();
      let name2 = obj2.name.toUpperCase();

      let comparison = 0;

      if (name1 > name2) comparison = 1;
      else if (name1 < name2) comparison = -1;

      return comparison;
    });
   } else if (this.orderBy === 'nameDesc') {
    this.courses = this.courses.sort(function(obj1,obj2){
      let name1 = obj2.name.toUpperCase();
      let name2 = obj1.name.toUpperCase();

      let comparison = 0;

      if (name1 > name2) comparison = 1;
      else if (name1 < name2) comparison = -1;

      return comparison;
    });
   } else if (this.orderBy === 'rankAsc') {
    this.courses = this.courses.sort(function(obj1,obj2){
      let name1 = obj1.rank;
      let name2 = obj2.rank;

      let comparison = 0;

      if (name1 > name2) comparison = 1;
      else if (name1 < name2) comparison = -1;

      return comparison;
    });
   } else if (this.orderBy === 'rankDesc') {
    this.courses = this.courses.sort(function(obj1,obj2){
      let name1 = obj2.rank;
      let name2 = obj1.rank;

      let comparison = 0;

      if (name1 > name2) comparison = 1;
      else if (name1 < name2) comparison = -1;

      return comparison;
    });
   }

  }

  ngOnInit() {
    this.orderBy='nameAsc';

  }






}
