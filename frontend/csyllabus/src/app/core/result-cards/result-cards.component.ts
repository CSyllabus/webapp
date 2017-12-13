import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import {CourseDialogComponent} from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-result-cards',
  templateUrl: './result-cards.component.html',
  styleUrls: ['./result-cards.component.css']
})

/**
 * ResultCardsComponent object displaying the courses results
 * <p>
 * @author CSyllabus Team
 */
export class ResultCardsComponent implements OnInit {

  /**
   * The list {@link Course} representing the course in input
   */
 @Input() courses: any = [];

  /**
   * @constructor create ResultCardsComponent object.
   * @param dialog {@link MatDialog} instance representing dialog.
   */
  constructor(private dialog: MatDialog) { }

  /**
   * openDialog open dialog given by course id
   * @param courseId {@link Int} representing the id of the course chosen.
   */
  openDialog(courseId) {
     this.dialog.open(CourseDialogComponent, {
        width: '', data: {'course_id': courseId}
      });
  }
  /**
   * ngOnInit
   */
  ngOnInit() { }




}
