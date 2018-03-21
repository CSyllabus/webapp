import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import {startWith} from 'rxjs/operators/startWith';
import {ENTER} from '@angular/cdk/keycodes';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

const COMMA = 188;
import {CountriesService} from '../../services/countries.service';
import {UniversitiesService} from '../../services/universities.service';
import {FacultiesService} from '../../services/faculties.service';
import {CoursesService} from '../../services/courses.service';
import {Course} from '../../classes/course';
import {Country} from '../../classes/country';
import {City} from '../../classes/city';
import {University} from '../../classes/university';
import {Faculty} from '../../classes/faculty';
import {Program} from '../../classes/program';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.css']
})
export class ComparatorComponent implements OnInit {
  comparatorStarted: Boolean;
  showNormalComparator: Boolean;
  countries: Country[];
  courses: Course[];
  comparatorResult: Course[];
  cities: City[];
  universities: University[];
  faculties: Faculty[];
  programs: Program[];

  filteredCities: City[];
  filteredUniversities: University[];
  filteredFaculties: Faculty[];
  filteredHomeFaculties: Faculty[];
  filteredHomePrograms: Program[];
  filteredHomeCourses: Course[];
  filteredHomeCoursesAutocomplete: Observable<Course[]>;

  homeCoursesControl: FormControl = new FormControl();
  pokemonControl: FormControl = new FormControl();
  externalCourseDescriptionControl: FormControl = new FormControl();

  queryCountry: Country;
  queryCity: City;
  queryHomeUniversity: University;

  queryUniversity: University;
  queryFaculty: Faculty;
  queryHomeFaculty: Faculty;

  loadingCourses: boolean;
  queryHomeCourse: any;
  listCourses: Course[] = [];
  multi_courses: any = [];
  externalCourseDescription: string;


  constructor(private coursesService: CoursesService, private countriesService: CountriesService,
              private universitiesService: UniversitiesService, private facultiesService: FacultiesService, private route: ActivatedRoute) {

  }

  ngOnInit() {


    this.comparatorStarted = true;
    this.showNormalComparator = true;
    this.filteredHomeCourses = [];
    this.filteredHomeCoursesAutocomplete = new Observable<Course[]>();
    this.queryHomeCourse = new Course;

    this.queryHomeFaculty = null;
    this.queryHomeUniversity = null;

    this.queryFaculty = null;
    this.queryUniversity = null;
    this.queryCountry = null;


    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
      this.universitiesService.getAllUniversities().subscribe(universities => {
        this.facultiesService.getAllFaculties().subscribe(faculties => {
          this.comparatorStarted = false;

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
                }
                if (flag) {
                  country.universities.push(university);
                }
              }
            }
          }
        });
      });
    });


    this.filteredHomeCoursesAutocomplete = this.homeCoursesControl.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.filter(name.toString()) : this.filteredHomeCourses)
      );

    this.route.params.subscribe(params => {
      let course_id = +params['courseId'];
      if (course_id) {
        this.coursesService.getCourseById(params['courseId']).subscribe(course => {
          this.listCourses.push(course);
        });
      }

    });


  }

  filterCoursesByHomeFaculty() {

    this.loadingCourses = true;
    this.coursesService.getCoursesByFaculty(this.queryHomeFaculty.id, 0).subscribe(courses => {
      this.filteredHomeCourses = [];
      this.filteredHomeCourses = courses;
      this.homeCoursesControl.setValue("");
      this.loadingCourses = false;
    });
  }

  filterCoursesByHomeUniversity() {
    this.loadingCourses = true;

    this.coursesService.getCoursesByUniversity(this.queryHomeUniversity.id, 0).subscribe(courses => {
      this.filteredHomeCourses = [];
      this.filteredHomeCourses = courses;
      this.homeCoursesControl.setValue("");
      this.loadingCourses = false;
    });
  }

  compareCourses() {
    if (this.showNormalComparator) {
      if (((this.queryFaculty || this.queryUniversity || this.queryCountry) && this.listCourses.length > 0)) {
        this.comparatorStarted = true;

        if (this.queryFaculty) {
          this.multi_courses = [];
          for (let i = 0; i < this.listCourses.length; i++) {
            this.coursesService.compareByFaculty(this.listCourses[i].id, this.queryFaculty.id).subscribe(courses => {
              this.compareCoursesInternalCallback(courses, i);
            });
          }

        } else if (this.queryUniversity) {
          this.multi_courses = [];
          for (let i = 0; i < this.listCourses.length; i++) {
            this.coursesService.compareByUniversity(this.listCourses[i].id, this.queryUniversity.id).subscribe(courses => {
              this.compareCoursesInternalCallback(courses, i);
            });
          }
        } else if (this.queryCountry) {
          this.multi_courses = [];
          for (let i = 0; i < this.listCourses.length; i++) {
            this.coursesService.compareByCountry(this.listCourses[i].id, this.queryCountry.id).subscribe(courses => {
              this.compareCoursesInternalCallback(courses, i);
            });
          }
        }
      }
    }
    else {
      this.multi_courses = [];
      if (((this.queryFaculty || this.queryUniversity || this.queryCountry) && this.externalCourseDescription)) {
        this.comparatorStarted = true;
        if (this.queryFaculty) {
          this.coursesService.compareExternalByFaculty(this.externalCourseDescription, this.queryFaculty.id).subscribe(courses => {
            this.compareCoursesExternalCallback(courses);
          });
        } else if (this.queryUniversity) {
          this.coursesService.compareExternalByUniversity(this.externalCourseDescription, this.queryUniversity.id).subscribe(courses => {
            this.compareCoursesExternalCallback(courses);
          });
        } else if (this.queryCountry) {
          this.coursesService.compareExternalByCountry(this.externalCourseDescription, this.queryCountry.id).subscribe(courses => {
            this.compareCoursesExternalCallback(courses);
          });
        }
      }
    }
  }

  compareCoursesInternalCallback(courses, i) {
    this.multi_courses.push(courses);
    if (i === this.listCourses.length - 1) {
      this.comparatorResult = this.multi_courses;
      this.comparatorStarted = false;
      this.scrollToResults();
    }
  }

  compareCoursesExternalCallback(courses) {
    this.multi_courses.push(courses);
    this.comparatorResult = this.multi_courses;
    this.comparatorStarted = false;
    this.scrollToResults();
  }

  addCourseToList(course) {
    if (course.id && (this.listCourses.indexOf(course) === -1) && (this.listCourses.length <= 4)) {
      this.listCourses.push(course);
      //this.homeCoursesControl.setValue('');
      //this.queryHomeCourse = undefined;
    }
  }

  removeCourseFromList(course) {
    this.listCourses = this.listCourses.filter(item => item.id !== course.id);
  }


  filter(name: string): Course[] {
    return this.filteredHomeCourses.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(course: Course): String {
    if (course)
      return course.name;
    else
      return "";
  }

  onSwitchChange(event) {
    this.showNormalComparator = !event.checked;
  }

  scrollToResults() {
    setTimeout(function () {
      (<HTMLInputElement>document.getElementById('comparator-result-component')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, 100);
  }
}
