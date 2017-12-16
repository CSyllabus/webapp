import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {CoursesService} from '../courses.service';
import {UsersService} from '../../user/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course';
import {User} from '../../user/user';
import {environment} from '../../../environments/environment';
import {FormControl} from '@angular/forms';
declare let window: any;
let self: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.html',
  styleUrls: ['./course.css']
})
export class CourseComponent implements OnInit {
  categoryControl: FormControl = new FormControl();

  course: Course;
  course_id: Number;
  author: User;
  keywords: any = [];
  keywordInput: string = "";


  constructor(private coursesService: CoursesService, private usersService: UsersService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    self = this;
    this.course = new Course();
    this.route.params.subscribe(params => {
      self.course_id = +params['id'];
      self.task = params['task'];
      if (self.course_id) {
        self.fetchCourseData(+params['id']);
      }

    });

  }


  addKeyword() {
    let keyword = {value: this.keywordInput, remove: false};
    this.keywordInput = "";
    this.keywords.push(keyword);
  }

  saveCourse(showSameCourse) {
    self.course.keywords = [];

    self.keywords.forEach(function (keyword) {
      if (!keyword.remove) {
        self.course.keywords.push(keyword.value);
      }
    });


    if (self.task !== 'edit') self.course.id = undefined;
    if (self.course.id) {
      this.coursesService.courseExisting(self.course.id, self.course).subscribe(res => {
        alert("Succesfully saved :)");
        self.fetchCourseData(self.course_id);
      }, error => alert(error));

    } else {
      this.coursesService.courseNew(self.course).subscribe(res => {
        self.course.id = res.id;
        self.course_id = res.id;


        if (showSameCourse) {
          this.router.navigate(['course/edit/' + res.id]);

        } else {
          this.router.navigate(['courses']);
        }
      }, error => alert(error));
    }
  }

   addCourse(showSameCourse) {
    self.course.keywords = [];

    self.keywords.forEach(function (keyword) {
      if (!keyword.remove) {
        self.course.keywords.push(keyword.value);
      }
    });


    /*if (self.task !== 'edit') self.course.id = undefined;
    if (self.course.id) {
      this.coursesService.courseExisting(self.course.id, self.course).subscribe(res => {
        alert("Succesfully saved :)");
        self.fetchCourseData(self.course_id);
      }, error => alert(error));

    } else {*/
      this.coursesService.courseNew(self.course).subscribe(res => {
        self.course.id = res.id;
        self.course_id = res.id;


        if (showSameCourse) {
          this.router.navigate(['course/edit/' + res.id]);

        } else {
          this.router.navigate(['courses']);
        }
      }, error => alert(error));
    //}
  }

  fetchCourseData(course_id) {
    self.keywords = [];
    self.coursesService.getCourse(course_id).subscribe(course => {
      self.course = course;

      course.keywords.forEach(function (el) {
        let keyword = {value: el, remove: false};
        self.keywords.push(keyword);
      });
    });
  }

}
