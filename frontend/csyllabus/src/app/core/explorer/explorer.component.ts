import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent, MatDialog} from '@angular/material';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import {CountriesService} from '../../services/countries.service';
import {CitiesService} from '../../services/cities.service';
import {UniversitiesService} from '../../services/universities.service';
import {FacultiesService} from '../../services/faculties.service';
import {CoursesService} from '../../services/courses.service';

import {Course} from '../../classes/course';
import {Country} from '../../classes/country';
import {University} from '../../classes/university';
import {Faculty} from '../../classes/faculty';

import {ENTER} from '@angular/cdk/keycodes';
const COMMA = 188;

@Component({
  selector: 'explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

export class ExplorerComponent implements OnInit {
  explorerResult: Course[];
  explorerStarted: Boolean;
  countries: Country[];
  universities: University[];
  faculties: Faculty[];

  pokemonControl: FormControl = new FormControl();

  queryCountry: Country;
  queryUniversity: University;
  queryFaculty: Faculty;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  keyword = [];

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
    this.explorerStarted = true;

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
                }
                if (flag) {
                  country.universities.push(university);
                }
              }
            }
          }
          this.explorerStarted = false;
        });
      });
    });
  }

  filterCitiesByCountry() {
    this.queryUniversity = this.queryFaculty = undefined;
  }


  exploreCourses() {
    if ((this.queryFaculty || this.queryUniversity || (this.queryCountry && this.keyword.length > 0))) {
      this.explorerStarted = true;

      let keywords = '';
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
            this.exploreCoursesCallback(courses);
          });
        } else {
          this.coursesService.getCoursesByFaculty(this.queryFaculty.id, 0).subscribe(courses => {
            this.exploreCoursesCallback(courses);
          });
        }
      } else if (this.queryUniversity) {
        if (this.keyword.length !== 0) {
          this.coursesService.exploreByUniversity(keywords, this.queryUniversity.id).subscribe(courses => {
            this.exploreCoursesCallback(courses);
          });
        } else {
          this.coursesService.getCoursesByUniversity(this.queryUniversity.id, 0).subscribe(courses => {
            this.exploreCoursesCallback(courses);
          });
        }
      } else if (this.queryCountry) {
        if (this.keyword.length !== 0) {
          this.coursesService.exploreByCountry(keywords, this.queryCountry.id).subscribe(courses => {
            this.exploreCoursesCallback(courses);
          });
        }
      }
    }
  }

  scrollToResults() {
    setTimeout(function () {
      (<HTMLInputElement>document.getElementById('explorer-result-component')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, 100);
  }

  exploreCoursesCallback(courses) {
    this.explorerResult = courses;
    this.explorerStarted = false;
    this.scrollToResults();
  }
}
