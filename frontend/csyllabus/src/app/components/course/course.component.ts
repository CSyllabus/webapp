import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CoursesService} from '../../services/courses.service';
import {Course} from '../../classes/course';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;

  constructor(private route: ActivatedRoute, private router: Router, private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.coursesService.getCourseById(+params['id']).subscribe(course => {
        this.course = course;
        if (course === undefined) {
          this.router.navigate(['not-found']);
        }
      });
    });
  }

}
