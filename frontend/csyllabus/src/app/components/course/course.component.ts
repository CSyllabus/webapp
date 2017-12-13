import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../classes/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

/**
 * CourseComponent object displaying the relative informations
 * from a course id
 * <p>
 * @author CSyllabus Team
 */
export class CourseComponent implements OnInit {
  /**
   * The {@link Course} instance representing the course displayed
   */
  course: Course;
  /**
   * @constructor create CourseComponent object.
   * @param route The {@link ActivatedRoute} instance representing route.
   * @param router The {@link Router} instance representing Router.
   * @param coursesService The {@link CoursesService} service to subscribe CoursesService.
   */
  constructor(private route: ActivatedRoute, private router: Router, private coursesService: CoursesService) {
  }

  /**
   * ngOnInit Sets the {@link Course} instance representing course
   * given by his id.
   */
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
