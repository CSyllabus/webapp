import { Component, OnInit } from '@angular/core';

import { CountriesService } from './services/countries.service';
import { CitiesService } from './services/cities.service';
import { UniversitiesService } from './services/universities.service';
import { FacultiesService } from './services/faculties.service';
import { ProgramsService } from './services/programs.service';
import { CoursesService } from './services/courses.service';

import { Country } from './classes/country';
import { City } from './classes/city';
import { University } from './classes/university';
import { Faculty } from './classes/faculty';
import { Program } from './classes/program';
import { Course } from './classes/course';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'CSyllabus';

  countries: Country[] = [];
  cities: City[] = [];
  universities: University[] = [];
  faculties: Faculty[] = [];
  programs: Program[] = [];
  courses: Course[] = [];

  constructor(
    private countriesService: CountriesService,
    private citiesService: CitiesService,
    private universitiesService: UniversitiesService,
    private facultiesService: FacultiesService,
    private programsService: ProgramsService,
    private coursesService: CoursesService,
  ) { }


  ngOnInit() {
    /*this.countriesService.getAllCountries().subscribe(countries => {
         this.countries = countries;
         console.log(this.countries);
    });
    this.citiesService.getAllCities().subscribe(cities => {
         this.cities = cities;
         console.log(this.cities);
    });
    this.universitiesService.getAllUniversities().subscribe(universities => {
         this.universities = universities;
         console.log(this.universities);
    });
    this.facultiesService.getAllFaculties().subscribe(faculties => {
         this.faculties = faculties;
         console.log(this.faculties);
    });
    this.programsService.getAllPrograms().subscribe(programs => {
         this.programs = programs;
         console.log(this.programs);
    });
    this.coursesService.getAllCourses().subscribe(courses => {
         this.courses = courses;
         console.log(this.courses);
    });*/
  }
}
