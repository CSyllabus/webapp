import { ExplorerComponent } from './angular-material/explorer/explorer.component';
import { Component, OnInit } from '@angular/core';

import { CountriesService } from './countries.service';
import { CitiesService } from './cities.service';
import { UniversitiesService } from './universities.service';
import { FacultiesService } from './faculties.service';
import { ProgramsService } from './programs.service';
import { CoursesService } from './courses.service';
import { Country } from './country';
import { City } from './city';
import { University } from './university';
import { Faculty } from './faculty';
import { Program } from './program';
import { Course } from './course';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Csyllabus';
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
    this.countriesService.getAllCountries().subscribe(countries => {
         this.countries = countries;
         console.log(this.countries);
    })
    this.citiesService.getAllCities().subscribe(cities => {
         this.cities = cities;
         console.log(this.cities);
    })
    this.universitiesService.getAllUniversities().subscribe(universities => {
         this.universities = universities;
         console.log(this.universities);
    })
    this.facultiesService.getAllFaculties().subscribe(faculties => {
         this.faculties = faculties;
         console.log(this.faculties);
    })
    this.programsService.getAllPrograms().subscribe(programs => {
         this.programs = programs;
         console.log(this.programs);
    })
    this.coursesService.getAllCourses().subscribe(courses => {
         this.courses = courses;
         console.log(this.courses);
    })
  }
}
