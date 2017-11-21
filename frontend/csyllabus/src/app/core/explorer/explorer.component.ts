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

import {Country} from '../../classes/country';
import {City} from '../../classes/city';
import {University} from '../../classes/university';
import {Faculty} from '../../classes/faculty';
import {Program} from '../../classes/program';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

export class ExplorerComponent implements OnInit {
  @Output() backgroundImage = new EventEmitter<any>();
  @Output() explorerResult = new EventEmitter<any>();

  explorerStarted: Boolean;
  countries: Country[];
  cities: City[];
  universities: University[];
  faculties: Faculty[];
  programs: Program[];

  filteredCities: City[];
  filteredUniversities: University[];
  filteredFaculties: Faculty[];

  coursesControl: FormControl = new FormControl();
  citiesControl: FormControl = new FormControl();
  universitiesControl: FormControl = new FormControl();
  facultiesControl: FormControl = new FormControl();

  queryCountry: Country;
  queryCity: City;
  queryUniversity: University;
  queryFaculty: Faculty;
  queryProgram: Program;
  queryLevel: string;

  /*levels = [
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
   ];*/

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  keyword = [];
  showKeywords = false;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      for (let i = 0; i < this.keyword.length; i++) {
        if (this.keyword[i].name === value.trim()) {
          input.value = '';
          return;
        }
      }

      this.keyword.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(keyword: any): void {
    const index = this.keyword.indexOf(keyword);

    if (index >= 0) {
      this.keyword.splice(index, 1);
    }
  }


  constructor(private coursesService: CoursesService, private countriesService: CountriesService, private citiesService: CitiesService,
              private universitiesService: UniversitiesService, private facultiesService: FacultiesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.countriesService.getAllCountries().subscribe(countries => this.countries = countries);
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

  exploreCourses() {
    let keywords = '';

    if ((this.keyword.length === 0) || (!this.queryCountry)) {
      this.dialog.open(SearchDialogComponent, {
        width: '250px', data: {}
      });
    } else {
      this.explorerStarted = true;
      for (let i = 0; i < this.keyword.length; i++) {
        if (i === 0) {
          keywords += this.keyword[i].name;
        } else {
          keywords += '-' + this.keyword[i].name;
        }
      }
      if (this.queryFaculty) {
        this.coursesService.exploreByFaculty(keywords, this.queryFaculty.id).subscribe(courses => {
          this.explorerResult.emit(courses);
          this.explorerStarted = false;
        });
      } else if (this.queryUniversity) {
        this.coursesService.exploreByUniversity(keywords, this.queryUniversity.id).subscribe(courses => {
          this.explorerResult.emit(courses);
          this.explorerStarted = false;
        });
      } else if (this.queryCity) {
        this.coursesService.exploreByCity(keywords, this.queryCity.id).subscribe(courses => {
          this.explorerResult.emit(courses);
          this.explorerStarted = false;
        });
      } else if (this.queryCountry) {
        this.coursesService.exploreByCountry(keywords, this.queryCountry.id).subscribe(courses => {
          this.explorerResult.emit(courses);
          this.explorerStarted = false;
        });
      }
    }
  }

  displaySelect(element: any): string {
    return element ? element.name : '';
  }
}
