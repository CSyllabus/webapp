import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';


import { CountriesService } from './countries.service';
import { CitiesService } from './cities.service';
import { CoursesService } from './courses.service';
import { FacultiesService } from './faculties.service';
import { ProgramsService } from './programs.service';
import { UniversitiesService } from './universities.service';

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
