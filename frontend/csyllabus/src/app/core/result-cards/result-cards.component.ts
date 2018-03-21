import {Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {CourseDialogComponent} from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-result-cards',
  templateUrl: './result-cards.component.html',
  styleUrls: ['./result-cards.component.css']
})
export class ResultCardsComponent implements OnInit, OnChanges {

  @Input() courses: any = [];
  orderBy: String;
  page = 1;

  constructor(private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.orderResults();
  }

  openDialog(course_id) {
    this.dialog.open(CourseDialogComponent, {
      width: '', data: {'course_id': course_id}
    });
  }

  orderResults() {
    if (this.courses) {
      this.courses = this.courses.sort((obj1, obj2)  => {
        let name1, name2;
        if (this.orderBy === 'nameAsc') {
          name1 = obj1.name.toUpperCase();
          name2 = obj2.name.toUpperCase();
        } else if (this.orderBy === 'nameDesc') {
          name1 = obj2.name.toUpperCase();
          name2 = obj1.name.toUpperCase();
        } else if (this.orderBy === 'rankAsc') {
          name1 = (obj1.rank * 100);
          name2 = (obj2.rank * 100);
        } else if (this.orderBy === 'rankDesc') {
          name1 = (obj2.rank * 100);
          name2 = (obj1.rank * 100);
        }

        let comparison = 0;

        if (name1 > name2) comparison = 1;
        else if (name1 < name2) comparison = -1;

        return comparison;
      });
    }
  }

  ngOnInit() {
    this.orderBy = 'nameAsc';
  }

}
