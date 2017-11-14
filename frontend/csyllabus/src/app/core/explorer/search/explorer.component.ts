import {CountriesService} from './../../../services/countries.service';
import {CitiesService} from './../../../services/cities.service';
import {UniversitiesService} from './../../../services/universities.service';
import {FacultiesService} from './../../../services/faculties.service';
import {ProgramsService} from './../../../services/programs.service';
import {CoursesService} from './../../../services/courses.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Course} from './../../../classes/course';
import {Country} from './../../../classes/country';
import {City} from './../../../classes/city';
import {University} from './../../../classes/university';
import {Faculty} from './../../../classes/faculty';
import {Program} from './../../../classes/program';

import {AngularMaterialModule} from './../../../angular-material/angular-material.module';
import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormControlDirective} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import {SearchDialogComponent} from './search-dialog/search-dialog';

const COMMA = 188;

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

/* -*- coding: utf - 8 -*-
 # @Author: Sebastian
 # @title: TableFilteringExplorer
 # @Date: 2017 - 11 - 03
 # @Last Modified by: Adrien Roques
 # @Last Modified time: 2017 - 11 - 05
 # @Description: */
export class ExplorerComponent implements OnInit {
  @Output() backgroundImage = new EventEmitter<any>();
  @Output() explorerResult = new EventEmitter<any>();

  explorerStarted: Boolean;
  countries: Country[];
  cities: City[];
  universities: University[];
  faculties: Faculty[];
  programs: Program[];
  coursesAvailable: Course[];

  filteredCities: City[];
  filteredUniversities: University[];
  filteredFaculties: Faculty[];
  filteredPrograms: Program[];

  coursesControl: FormControl = new FormControl();
  citiesControl: FormControl = new FormControl();
  universitiesControl: FormControl = new FormControl();
  facultiesControl: FormControl = new FormControl();
  programsControl: FormControl = new FormControl();

  queryCountry: Country;
  queryCity: City;
  queryUniversity: University;
  queryFaculty: Faculty;
  queryProgram: Program;
  queryLevel: string;

  levels = [
    {value: 'A1', viewValue: 'A1'},
    {value: 'A2', viewValue: 'A2'},
    {value: 'B1', viewValue: 'B1'},
    {value: 'B2', viewValue: 'B2'},
    {value: 'C1', viewValue: 'C1'},
    {value: 'C2', viewValue: 'C2'}
  ];

  semesters = [
    {value: 1, viewValue: 'Autumn/Winter'},
    {value: 2, viewValue: 'Spring/Summer'}
  ];

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  keyword = [];
  showKeywords = false;

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      this.keyword.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(keyword: any): void {
    let index = this.keyword.indexOf(keyword);

    if (index >= 0) {
      this.keyword.splice(index, 1);
    }
  }


  constructor(private coursesService: CoursesService, private countriesService: CountriesService,
              private citiesService: CitiesService, private universitiesService: UniversitiesService
    , private facultiesService: FacultiesService, private programsService: ProgramsService, private dialog: MatDialog) {
  }

  // filteredOptions: Observable<string[]>;

  ngOnInit() {
    // Array = ["hola", "adios"]
    // console.log(this.coursesAvailable);
    // console.log(this.Array);
    // this.coursesService.getAllCourses().subscribe(courses => this.coursesAvailable = courses);
    this.countriesService.getAllCountries().subscribe(countries => this.countries = countries);
    // this.citiesService.getAllCities().subscribe(cities => this.cities = this.filteredCities = cities);
    // this.universitiesService.getAllUniversities().subscribe(universities => this.universities = this.filteredUniversities = universities);
    // this.facultiesService.getAllFaculties().subscribe(faculties => this.faculties = this.filteredFaculties = faculties);
    // this.programsService.getAllPrograms().subscribe(programs => this.programs = this.filteredPrograms = programs);
  }

  filterCitiesByCountry() {
    if (this.queryCountry && this.queryCountry.id) {
      this.citiesService.getCitiesByCountry(this.queryCountry.id).subscribe(cities => {
        this.filteredCities = cities;
        this.queryCity = undefined;
        this.queryUniversity = undefined;
        this.queryProgram = undefined;
        this.backgroundImage.emit(this.queryCountry.img);
      });
    }


    for (let i = 0; i < this.keyword.length; i++) {
      console.log(this.keyword[i].name);
    }
  }

  filterUniversitiesByCity() {
    this.universitiesService.getUniversitiesByCity(this.queryCity.id).subscribe(universities => {
      this.filteredUniversities = universities;
      this.queryUniversity = undefined;
      this.queryProgram = undefined;
    });
  }

  //filterUniversitiesByCity() {
  //this.filteredUniversities = <University[]> this.queryCity.universities;
  //this.queryUniversity = undefined;
  //this.queryProgram = undefined;

  // this.backgroundImage.emit('city image');
  //}

  filterFacultiesByUniversity() {
    this.facultiesService.getFacultiesByUniversity(this.queryUniversity.id).subscribe(faculties => {
      this.filteredFaculties = faculties;
      this.queryFaculty = undefined;
    });
  }

//  filterFacultiesByUniversity() {
  //  this.filteredFaculties = <Faculty[]> this.queryUniversity.faculties;
  //this.queryFaculty = undefined;

  // this.backgroundImage.emit('uni image');
  //}

  /*filterProgramsByLevel() {
   this.filterProgramsByUniversity();
   this.filteredPrograms = this.filteredPrograms.filter(program => {
   return program.study_level.toLowerCase() === this.queryLevel.toLowerCase();
   });
   }*/
  keywords: any;
  exploredCourses: any;
  element: { name: string };

  exploreCourses() {
    if ((this.keyword.length === 0) || (!this.queryCountry)) {
      this.dialog.open(SearchDialogComponent, {
        width: '250px',
        data: {}
      });
    } else {
      this.keywords = '';
      this.explorerStarted = true;
      for (let i = 0; i < this.keyword.length; i++) {
        this.keywords += ' ' + this.keyword[i].name;
      }
      if (this.queryFaculty) {
        this.coursesService.exploreByFaculty(this.keywords, this.queryFaculty.id).subscribe(courses => {
          this.exploredCourses = courses;
          this.explorerResult.emit(courses);
          this.explorerStarted = false;
        });
      } else if (this.queryUniversity) {
        this.coursesService.exploreByUniversity(this.keywords, this.queryUniversity.id).subscribe(courses => {
          this.exploredCourses = courses;
          this.explorerResult.emit(courses);
          this.explorerStarted = false;
        });
      } else if (this.queryCity) {
        this.coursesService.exploreByCity(this.keywords, this.queryCity.id).subscribe(courses => {
          this.exploredCourses = courses;
          this.explorerResult.emit(courses);
          this.explorerStarted = false;
        });
      } else if (this.queryCountry) {
        this.coursesService.exploreByCountry(this.keywords, this.queryCountry.id).subscribe(courses => {
          this.exploredCourses = courses;
          this.explorerResult.emit(courses);
          this.explorerStarted = false;
        });
      }

    }


  }

  displayCountrySelect(country: Country): string {
    return country ? country.name : '';
  }

  displayCitySelect(city: City): string {
    return city ? city.name : '';
  }

  displayUniversitySelect(university: University): string {
    return university ? university.name : '';
  }

  displayFacultiesSelect(faculty: Faculty): string {
    return faculty ? faculty.name : '';
  }
}
