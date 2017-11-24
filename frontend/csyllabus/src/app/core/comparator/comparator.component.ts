import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {MatChipInputEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {ENTER} from '@angular/cdk/keycodes';
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


@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.css']
})
export class ComparatorComponent implements OnInit {


  @Output() backgroundImage = new EventEmitter<any>();
  @Output() comparatorResult = new EventEmitter<any>();


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

  coursesControl: FormControl = new FormControl();
  citiesControl: FormControl = new FormControl();
  universitiesControl: FormControl = new FormControl();
  facultiesControl: FormControl = new FormControl();
  homeUnivControl: FormControl = new FormControl();
  homeFacultiesControl: FormControl = new FormControl();
  homeProgramsControl: FormControl = new FormControl();
  homeCoursesControl: FormControl = new FormControl();

  queryCountry: Country;
  queryCity: City;
  queryHomeUniversity: University;
  queryUniversity: University;
  queryFaculty: Faculty;
  queryHomeFaculty: Faculty;
  queryProgram: Program;
  queryHomeProgram: Program;
  queryLevel: string;
  queryHomeCourse: Course;

  constructor(private coursesService: CoursesService, private countriesService: CountriesService, private citiesService: CitiesService,
              private universitiesService: UniversitiesService, private facultiesService: FacultiesService, private programsService: ProgramsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.countriesService.getAllCountries().subscribe(countries => this.countries = countries);
    this.universitiesService.getAllUniversities().subscribe(universities => this.universities = universities);
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
    this.queryHomeFaculty = undefined;
    this.facultiesService.getFacultiesByUniversity(this.queryHomeUniversity.id).subscribe(faculties => {
      this.filteredHomeFaculties = faculties;
      console.log(this.queryHomeUniversity);
      if (this.queryHomeUniversity.img) {
        this.backgroundImage.emit(this.queryHomeUniversity.img);
      }
    });
  }

  filterProgramsByHomeFaculty() {
    this.queryProgram = undefined;
    this.programsService.getProgramsByFaculty(this.queryHomeFaculty.id).subscribe(programs => {
      this.filteredHomePrograms = programs;
      console.log(programs);

    });
  }

  filterCoursesByHomeProgram() {
    console.log(this.queryHomeProgram);
    this.coursesService.getCoursesByProgram(this.queryHomeProgram.id).subscribe(courses => {
      this.filteredHomeCourses = courses;
      console.log(courses);

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

    this.comparatorStarted = true;


      if (this.queryFaculty) {
        this.coursesService.compareByFaculty(this.queryHomeCourse.id, this.queryFaculty.id).subscribe(courses => {
          this.comparatorResult.emit(courses);
          this.comparatorStarted = false;
        });
      } else if (this.queryUniversity) {
        this.coursesService.compareByUniversity(this.queryHomeCourse.id, this.queryUniversity.id).subscribe(courses => {
          this.comparatorResult.emit(courses);
          this.comparatorStarted = false;
        });
      } else if (this.queryCity) {
        this.coursesService.compareByCity(this.queryHomeCourse.id, this.queryCity.id).subscribe(courses => {
          this.comparatorResult.emit(courses);
          this.comparatorStarted = false;
        });
      } else if (this.queryCountry) {
        this.coursesService.compareByCountry(this.queryHomeCourse.id, this.queryCountry.id).subscribe(courses => {
          this.comparatorResult.emit(courses);
          this.comparatorStarted = false;
        });
      }

  }

  displaySelect(element: any): string {
    return element ? element.name : '';
  }

}
