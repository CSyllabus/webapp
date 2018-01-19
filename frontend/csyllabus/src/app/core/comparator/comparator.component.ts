import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import {startWith} from 'rxjs/operators/startWith';
import {ENTER} from '@angular/cdk/keycodes';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';

const COMMA = 188;
import {SearchDialogComponent} from './search-dialog/search-dialog.component';
import {CountriesService} from '../../services/countries.service';
import {CitiesService} from '../../services/cities.service';
import {UniversitiesService} from '../../services/universities.service';
import {FacultiesService} from '../../services/faculties.service';
import {CoursesService} from '../../services/courses.service';
import {ProgramsService} from '../../services/programs.service';
import {Course} from '../../classes/course';
import {Country} from '../../classes/country';
import {City} from '../../classes/city';
import {University} from '../../classes/university';
import {Faculty} from '../../classes/faculty';
import {Program} from '../../classes/program';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.css']
})
export class ComparatorComponent implements OnInit {

  @Output() backgroundImage = new EventEmitter<any>();
  @Output() comparatorResult = new EventEmitter<any>();
  @Output() mainCourse = new EventEmitter<any>();

  comparatorStarted: Boolean;
  countries: Country[];
  courses: Course[];
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
  coursesControl: FormControl = new FormControl();
  citiesControl: FormControl = new FormControl();
  universitiesControl: FormControl = new FormControl();
  facultiesControl: FormControl = new FormControl();
  homeUnivControl: FormControl = new FormControl();
  homeFacultiesControl: FormControl = new FormControl();
  homeProgramsControl: FormControl = new FormControl();
  homeCoursesControl: FormControl = new FormControl();
  pokemonControl: FormControl = new FormControl();

  queryCountry: Country;
  queryCity: City;
  queryHomeUniversity: University;
  queryUniversity: University;
  queryFaculty: Faculty;
  queryHomeFaculty: Faculty;
  queryProgram: Program;
  queryHomeProgram: Program;
  queryLevel: string;
  loadingCourses: boolean;
  queryHomeCourse: any;
  listCourses: Course[] = [];
  multi_courses: any = [];


  constructor(private coursesService: CoursesService, private countriesService: CountriesService, private citiesService: CitiesService,
              private universitiesService: UniversitiesService, private facultiesService: FacultiesService, private programsService: ProgramsService,
              private dialog: MatDialog, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.comparatorStarted = true;
    this.filteredHomeCourses = new Array<Course>();
    this.filteredHomeCoursesAutocomplete = new Observable<Course[]>();
    this.queryHomeCourse = new Course;
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
        map(name => name ? this.filter(name.toString()) : this.filteredHomeCourses.slice())
      );
  }

  filterCitiesByCountry() {
    this.queryCity = this.queryUniversity = this.queryFaculty = undefined;
    this.backgroundImage.emit(null);
    if (this.queryCountry && this.queryCountry.id) {
      this.citiesService.getCitiesByCountry(this.queryCountry.id).subscribe(cities => {
        this.filteredCities = cities;
        if (this.queryCountry.img) {
          this.backgroundImage.emit(this.queryCountry.img);
        }
      });
    }
  }

  filterUniversitiesByCity() {
    this.queryUniversity = this.queryFaculty = undefined;
    this.universitiesService.getUniversitiesByCity(this.queryCity.id).subscribe(universities => {
      this.filteredUniversities = universities;
      if (this.queryCity.img) {
        this.backgroundImage.emit(this.queryCity.img);
      }
    });
  }

  filterFacultiesByHomeUniversity() {
    this.queryHomeFaculty = this.queryHomeProgram = this.queryHomeCourse = undefined;
    this.filteredHomeFaculties = [];
    this.facultiesService.getFacultiesByUniversity(this.queryHomeUniversity.id).subscribe(faculties => {
      this.filteredHomeFaculties = faculties;
      console.log(this.queryHomeUniversity);
      if (this.queryHomeUniversity.img) {
        this.backgroundImage.emit(this.queryHomeUniversity.img);
      }
    });

    this.programsService.getProgramsByUniversity(this.queryHomeUniversity.id).subscribe(programs => {
      this.filteredHomePrograms = programs;
      console.log(programs);

    });
  }

  filterProgramsByHomeFaculty() {
    this.queryHomeProgram = this.queryHomeCourse = undefined;
    this.programsService.getProgramsByFaculty(this.queryHomeFaculty.id).subscribe(programs => {
      this.filteredHomePrograms = programs;
      console.log(programs);

    });
  }

  filterCoursesByHomeProgram() {
    this.loadingCourses = true;
    this.coursesService.getCoursesByProgram(1).subscribe(courses => {
      this.filteredHomeCourses = courses;
      this.loadingCourses = false;
    });
  }

  filterCoursesByHomeFaculty() {

    this.loadingCourses = true;
    this.coursesService.getCoursesByFaculty(this.queryHomeFaculty.id, 0).subscribe(courses => {
      this.listCourses = [];
      this.filteredHomeCourses = [];
      this.filteredHomeCourses = courses;
      this.loadingCourses = false;

    });
  }

  filterCoursesByHomeUniversity() {


    console.log(this.listCourses);
    this.loadingCourses = true;

    this.coursesService.getCoursesByUniversity(this.queryHomeUniversity.id, 0).subscribe(courses => {
      this.listCourses = [];
      this.filteredHomeCourses = [];
      this.filteredHomeCourses = courses;
      this.loadingCourses = false;

    });
  }

  filterFacultiesByUniversity() {
    this.queryFaculty = undefined;
    this.facultiesService.getFacultiesByUniversity(this.queryUniversity.id).subscribe(faculties => {
      this.filteredFaculties = faculties;
      if (this.queryUniversity.img) {
        this.backgroundImage.emit(this.queryUniversity.img);
      }
    });
  }


  filterFacultiesChange() {
    if (this.queryFaculty.img) {
      this.backgroundImage.emit(this.queryFaculty.img);
    }
  }

  compareCourses() {
    if (((this.queryFaculty || this.queryUniversity || this.queryCountry ) && this.listCourses.length > 0)) {
      this.comparatorStarted = true;
      let coursesCounter = this.listCourses.length;

      if (this.queryFaculty) {
        this.multi_courses = [];
        for (let i = 0; i < this.listCourses.length; i++) {
          this.coursesService.compareByFaculty(this.listCourses[i].id, this.queryFaculty.id).subscribe(courses => {
            this.multi_courses.push(courses);
            if (i === this.listCourses.length - 1) {
              this.comparatorResult.emit(this.multi_courses);
              this.comparatorStarted = false;
              this.snackBar.open('Showing top results for a given search, ordered by similarity rank.' +
                ' These results are not perfectly accurate, yet! :)', 'CLOSE', {
                duration: 10000
              });
            }
          });
        }
      } else if (this.queryUniversity) {
        this.multi_courses = [];
        for (let i = 0; i < this.listCourses.length; i++) {
          this.coursesService.compareByUniversity(this.listCourses[i].id, this.queryUniversity.id).subscribe(courses => {
            this.multi_courses.push(courses);
            if (i === this.listCourses.length - 1) {
              this.comparatorResult.emit(this.multi_courses);
              this.comparatorStarted = false;
              this.snackBar.open('Showing top results for a given search, ordered by similarity rank.' +
                ' These results are not perfectly accurate, yet! :)', 'CLOSE', {
                duration: 10000
              });
            }
          });
        }
      } else if (this.queryCountry) {
        this.multi_courses = [];
        for (let i = 0; i < this.listCourses.length; i++) {
          this.coursesService.compareByCountry(this.listCourses[i].id, this.queryCountry.id).subscribe(courses => {
            this.multi_courses.push(courses);
            if (i === this.listCourses.length - 1) {
              this.comparatorResult.emit(this.multi_courses);
              this.comparatorStarted = false;
              this.snackBar.open('Showing top results for a given search, ordered by similarity rank.' +
                ' These results are not perfectly accurate, yet! :)', 'CLOSE', {
                duration: 10000
              });
            }
          });
        }
      }
    } else {
      this.dialog.open(SearchDialogComponent, {
        width: '250px', data: {}
      });
    }
  }

  displaySelect(element: any): string {
    return element ? element.name : '';
  }

  addCourseToList(course) {
    if (course.id && (this.listCourses.indexOf(course) === -1) && (this.listCourses.length <= 4)) {
      this.listCourses.push(course);
      //this.queryHomeCourse = null;
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


}
