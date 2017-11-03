import { CoreComponent } from './angular-material/core/core.component';
import { ExplorerComponent } from './angular-material/explorer/explorer.component';
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
  declarations: [
    AppComponent,ExplorerComponent,CoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule
  ],
  providers: [
    CountriesService,
    CitiesService,
    CoursesService,
    FacultiesService,
    ProgramsService,
    UniversitiesService
   ],
  bootstrap: [AppComponent,ExplorerComponent,CoreComponent],
})
export class AppModule { }
