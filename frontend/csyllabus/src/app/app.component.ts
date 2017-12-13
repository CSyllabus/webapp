import { Component, OnInit } from '@angular/core';

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

  constructor() { }


  ngOnInit() {
  }
}
