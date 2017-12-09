import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';


import { CoreModule } from './core/core.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { CoreComponent} from './core/core.component';
import { CourseComponent } from './components/course/course.component';

import { CountriesService } from './services/countries.service';
import { CitiesService } from './services/cities.service';
import { CoursesService } from './services/courses.service';
import { FacultiesService } from './services/faculties.service';
import { ProgramsService } from './services//programs.service';
import { UniversitiesService } from './services/universities.service';
import {ROUTES} from './app.routes';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component'


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule

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
    CourseComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
