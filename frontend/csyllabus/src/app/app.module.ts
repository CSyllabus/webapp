import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';


import { CountriesService } from './services/countries.service';
import { CitiesService } from './services/cities.service';
import { CoursesService } from './services/courses.service';
import { FacultiesService } from './services/faculties.service';
import { ProgramsService } from './services//programs.service';
import { UniversitiesService } from './services/universities.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule,
    CoreModule
  ],
  providers: [
    CountriesService,
    CitiesService,
    CoursesService,
    FacultiesService,
    ProgramsService,
    UniversitiesService
   ],
  declarations: [
    AppComponent],
  bootstrap: [AppComponent],
})

export class AppModule { }
