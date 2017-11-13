import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { CoreModule } from './core/core.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import {CoreComponent} from './core/core.component';

import { CountriesService } from './services/countries.service';
import { CitiesService } from './services/cities.service';
import { CoursesService } from './services/courses.service';
import { FacultiesService } from './services/faculties.service';
import { ProgramsService } from './services//programs.service';
import { UniversitiesService } from './services/universities.service';


const ROUTES = [
  {
    path: '',
    redirectTo: 'core',
    pathMatch: 'full'
  },
  {
    path: 'core',
    component: CoreComponent
  }
];


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(ROUTES)
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
    AppComponent,
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
