import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';

import { SearchDialogComponent } from './search-dialog/search-dialog.component';

import { CountriesService } from '../../services/countries.service';
import { CitiesService } from '../../services/cities.service';
import { UniversitiesService } from '../../services/universities.service';
import { FacultiesService } from '../../services/faculties.service';
import { CoursesService } from '../../services/courses.service';

import { Country } from '../../classes/country';
import { City } from '../../classes/city';
import { University } from '../../classes/university';
import { Faculty } from '../../classes/faculty';
import { Program } from '../../classes/program';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

/**
 * The {@link const int} instance representing COMMA value.
 */
const COMMA = 188;

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

/**
 * ExplorerComponent object explore courses
 * <p>
 * @author CSyllabus Team
 */
export class ExplorerComponent implements OnInit {

  /**
   * The {@link EventEmitter<any>} instance representing the sender to emit the new background.
   */
  @Output() backgroundImage = new EventEmitter<any>();
  /**
   * The {@link EventEmitter<any>} instance representing the sender to emit the result courses.
   */
  @Output() explorerResult = new EventEmitter<any>();

  /**
   * The {@link Boolean instance representing comparatorStarted.
   */
  explorerStarted: Boolean;
  /**
   * The list {@link Country} instance representing countries.
   */
  countries: Country[];
  /**
   * The list {@link City} instance representing cities.
   */
  cities: City[];
  /**
   * The list {@link University} instance representing universities.
   */
  universities: University[];
  /**
   * The list {@link Faculty} instance representing faculties.
   */
  faculties: Faculty[];
  /**
   * The list {@link Program} instance representing programs.
   */
  programs: Program[];

  /**
   * The list {@link City} instance representing filtered Cities.
   */
  filteredCities: City[];
  /**
   * The list {@link University} instance representing filtered Universities.
   */
  filteredUniversities: University[];
  /**
   * The list {@link Faculty} instance representing filtered Faculties.
   */
  filteredFaculties: Faculty[];

  /**
   * The {@link FormControl} instance representing courses Control.
   */
  coursesControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing cities Control.
   */
  citiesControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing universities Control.
   */
  universitiesControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing faculties Control.
   */
  facultiesControl: FormControl = new FormControl();

  /**
   * The {@link Country} instance representing queryCountry.
   */
  queryCountry: Country;
  /**
   * The {@link City} instance representing queryCity.
   */
  queryCity: City;
  /**
   * The {@link University} instance representing queryUniversity.
   */
  queryUniversity: University;
  /**
   * The {@link Faculty} instance representing queryFaculty.
   */
  queryFaculty: Faculty;
  /**
   * The {@link Program} instance representing queryProgram.
   */
  queryProgram: Program;
  /**
   * The {@link string} instance representing queryLevel.
   */
  queryLevel: string;

  /**
   * The array {@link int} instance representing separatorKeysCodes.
   * Enter, comma
   */
  separatorKeysCodes = [ENTER, COMMA];
  /**
   * The {@link string} instance representing keyword in chip list.
   * Enter, comma
   */
  keyword = [];
  /**
   * The {@link boolean} instance representing showKeywords.
   * Enter, comma
   */
  showKeywords = false;

  /**
   * remove
   * @param event {@link MatChipInputEvent} representing the keyword to add in the chip list.
   * Set list {@link string} instance representing keyword.
   */
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

  /**
   * remove
   * @param keyword {@link string} representing the keyword to remove in the chip list.
   * Set list {@link string} instance representing keyword.
   */
  remove(keyword: any): void {
    const index = this.keyword.indexOf(keyword);

    if (index >= 0) {
      this.keyword.splice(index, 1);
    }
  }

  /**
   * @constructor create SearchDialogComponent object.
   * @param coursesService The {@link CoursesService} service to subscribe CoursesService.
   * @param citiesService The {@link CitiesService} service to subscribe CitiesService.
   * @param facultiesService The {@link FacultiesService} service to subscribe FacultiesService.
   * @param countriesService The {@link CountriesService} service to subscribe CountriesService.
   * @param universitiesService The {@link UniversitiesService} service to subscribe UniversitiesService.
   * @param dialog {@link MatDialog} instance representing dialog.
   */
  constructor(private coursesService: CoursesService, private countriesService: CountriesService, private citiesService: CitiesService,
              private universitiesService: UniversitiesService, private facultiesService: FacultiesService, private dialog: MatDialog) {
  }

  /**
   * ngOnInit
   * Get All the countries {@link Country} instance representing Country.
   */
  ngOnInit() {
    this.countriesService.getAllCountries().subscribe(countries => this.countries = countries);
  }

  /**
   * filterCitiesByCountry filtering citie given by country id
   * The list {@link City} instance representing filteredCities is updated.
   * The string {@link string} instance representing backgroundImage is updated.
   */
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

  /**
   * filterUniversitiesByCity filtering universities given by city id
   * The list {@link University} instance representing filteredUniversities is updated.
   * The string {@link string} instance representing backgroundImage is updated.
   */
  filterUniversitiesByCity() {
    this.queryUniversity = this.queryFaculty = undefined;
    this.universitiesService.getUniversitiesByCity(this.queryCity.id).subscribe(universities => {
      this.filteredUniversities = universities;
      if (this.queryCity.img) {
        this.backgroundImage.emit(this.queryCity.img);
      }
    });
  }

  /**
   * filterFacultiesByUniversity filtering faculties given by university id
   * The list {@link Faculty} instance representing filteredFaculties is updated.
   * The string {@link string} instance representing backgroundImage is updated.
   */
  filterFacultiesByUniversity() {
    this.queryFaculty = undefined;
    this.facultiesService.getFacultiesByUniversity(this.queryUniversity.id).subscribe(faculties => {
      this.filteredFaculties = faculties;
      if (this.queryUniversity.img) {
        this.backgroundImage.emit(this.queryUniversity.img);
      }
    });
  }

  /**
   * filterFacultiesChange emit new background given by the new faculty image
   * The string {@link string} instance representing backgroundImage is updated.
   */
  filterFacultiesChange() {
    if (this.queryFaculty.img) {
      this.backgroundImage.emit(this.queryFaculty.img);
    }
  }

  /**
   * exploreCourses emit the courses corresponding to the previous filters
   */
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

  /**
   * displaySelect return the name of the element
   * @return the element name
   */
  displaySelect(element: any): string {
    return element ? element.name : '';
  }
}
