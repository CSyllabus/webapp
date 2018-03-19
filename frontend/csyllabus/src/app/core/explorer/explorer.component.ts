import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {MatChipInputEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {ENTER} from '@angular/cdk/keycodes';
import {MatSnackBar} from '@angular/material';
const COMMA = 188;

import {SearchDialogComponent} from './search-dialog/search-dialog.component';

import {CountriesService} from '../../services/countries.service';
import {CitiesService} from '../../services/cities.service';
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
  selector: 'explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

export class ExplorerComponent implements OnInit {
  @Output() backgroundImage = new EventEmitter<any>();
  @Output() explorerResult = new EventEmitter<any>();

  explorerResult_cp: Course[];
  explorerStarted: Boolean;
  numberOfResults : Number;
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
  pokemonControl: FormControl = new FormControl();


  queryCountry: Country;
  queryCity: City;
  queryUniversity: University;
  queryFaculty: Faculty;
  queryProgram: Program;
  queryLevel: string;
  filterByKeywords: Boolean = true;

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
              private universitiesService: UniversitiesService, private facultiesService: FacultiesService, private dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.explorerStarted = true;
    this.numberOfResults = 0;
    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
      this.universitiesService.getAllUniversities().subscribe(universities => {
        this.facultiesService.getAllFaculties().subscribe(faculties => {
          this.explorerStarted = false;
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

    if (!(this.queryFaculty || this.queryUniversity || (this.queryCountry && this.keyword.length > 0))) {
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
        if (this.keyword.length !== 0) {
          this.coursesService.exploreByFaculty(keywords, this.queryFaculty.id).subscribe(courses => {
            this.explorerResult.emit(courses);
            this.explorerResult_cp = courses;
            this.explorerStarted = false;
            this.timeout();
            this.snackBar.open('Showing top results for given search, ordered by keyword search', 'CLOSE', {
              duration: 5000
            });
          });
        } else {
          this.coursesService.getCoursesByFaculty(this.queryFaculty.id, 0).subscribe(courses => {
            this.explorerResult.emit(courses);
            this.explorerResult_cp = courses;

            this.explorerStarted = false;
            this.timeout();

          });
        }
      } else if (this.queryUniversity) {
        if (this.keyword.length !== 0) {
          this.coursesService.exploreByUniversity(keywords, this.queryUniversity.id).subscribe(courses => {
            this.explorerResult.emit(courses);
            this.explorerResult_cp = courses;
            this.explorerStarted = false;
            this.timeout();
            this.snackBar.open('Showing top results for given search, ordered by keyword search', 'CLOSE', {
              duration: 5000
            });
          });
        } else {
          this.coursesService.getCoursesByUniversity(this.queryUniversity.id, 0).subscribe(courses => {
            this.explorerResult.emit(courses);
            this.explorerResult_cp = courses;
            this.explorerStarted = false;
            this.timeout();
            this.snackBar.open('Showing top results for given search, ordered alphabetically', 'CLOSE', {
              duration: 5000
            });
          });
        }
      }else if (this.queryCountry) {
        if (this.keyword.length !== 0) {
          this.coursesService.exploreByCountry(keywords, this.queryCountry.id).subscribe(courses => {
            this.explorerResult.emit(courses);
            this.explorerResult_cp = courses;
            this.explorerStarted = false;
            this.timeout();
            this.snackBar.open('Showing top results for given search, ordered by keyword search', 'CLOSE', {
              duration: 5000
            });
          });
        }
      }
    }


  }

  timeout(){
    setTimeout(function () {
      (<HTMLInputElement>document.getElementById('explorer-result-component')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, 100);
  }

  displaySelect(element: any): string {
    return element ? element.name : '';
  }
}
