import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {CoursesService} from '../courses.service';
import {UsersService} from '../../user/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course';
import {User} from '../../user/user';
import {environment} from '../../../environments/environment';
import {FormControl} from '@angular/forms';

import {CountriesService} from '../../services/countries.service';
import {UniversitiesService} from '../../services/universities.service';
import {FacultiesService} from '../../services/faculties.service';

import {Country} from '../../classes/country';
import {University} from '../../classes/university';
import {Faculty} from '../../classes/faculty';

declare let window: any;
let self: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.html',
  styleUrls: ['./course.css']
})
export class CourseComponent implements OnInit {
  categoryControl: FormControl = new FormControl();
  pokemonControl: FormControl = new FormControl();

  course: Course;
  course_id: Number;
  author: User;
  keywords: any = [];
  keywordInput: string = "";
  countries: Country[];
  universities: University[];
  faculties: Faculty[];
  selected: string = 'Select University/Faculty';


  constructor(private coursesService: CoursesService, private facultiesService: FacultiesService, private universitiesService: UniversitiesService, private countriesService: CountriesService, private usersService: UsersService,
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


    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
      this.universitiesService.getAllUniversities().subscribe(universities => {
        this.facultiesService.getAllFaculties().subscribe(faculties => {
          for (let country of this.countries) {
            country['universities'] = [];
            country['faculties'] = [];
            for (let university of universities) {
              if (university.countryId === country.id) {
                let flag = true;
                for (let faculty of faculties) {
                  if (faculty.universityId === university.id) {
                    flag = false;
                    country.faculties.push(faculty);
                  }

                  if(faculty.name===this.course.faculty){
                    this.selected=faculty.name;
                  }

                }
                if (flag) {
                  country.universities.push(university);
                  console.log(university);

                  if(university.name===this.course.university){
                    this.selected=university.name;
                  }
                }
              }
            }
          }
        });
      });
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

    }
  }

   addCourse() {
    self.course.keywords = [];

    self.keywords.forEach(function (keyword) {
      if (!keyword.remove) {
        self.course.keywords.push(keyword.value);
      }
    });


    this.coursesService.courseNew(self.course).subscribe(res => {

      alert("Succesfully added :)");
      this.router.navigate(['courses/']);


    }, error => alert(error));


  }

  fetchCourseData(course_id) {
    self.keywords = [];
    self.coursesService.getCourse(course_id).subscribe(course => {
      self.course = course;

      //alert(course);
      if (course.keywords) {
      course.keywords.forEach(function (el) {
        let keyword = {value: el, remove: false};
        self.keywords.push(keyword);
      });
      }

    });
  }

}
