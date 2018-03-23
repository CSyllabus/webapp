import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { AppComponent } from './app.component';
import { CoursesComponent } from './course/courses/courses.component';
import { CourseComponent } from './course/course/course.component';

import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { CoursesService } from './course/courses.service';
import { UsersService } from './user/users.service';
import { UserComponent } from './user/user/user.component';
import { UsersComponent } from './user/users/users.component';
import { UniversityComponent } from './university/university/university.component';
import { UniversitiesComponent } from './university/universities/universities.component';
import { LoginComponent } from './login/login.component';

import { FacultiesService } from './services/faculties.service';
import { CountriesService } from './services/countries.service';
import { UniversitiesService } from './university/universities.service';
import {ErrorService} from "./services/error.service";

const ROUTES = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CoursesComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'course/:task',
    component: CourseComponent
  },
  {
    path: 'course/:task/:id',
    component: CourseComponent
  },
  {
    path: 'user/:task/:id',
    component: UserComponent
  },
  {
    path: 'user/:task',
    component: UserComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'universities',
    component: UniversitiesComponent
  },
  {
    path: 'university/:task',
    component: UniversityComponent
  },
  {
    path: 'university/:task/:id',
    component: UniversityComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    UserComponent,
    UsersComponent,
    UniversityComponent,
    UniversitiesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
   providers: [AuthService, CoursesService, FacultiesService, CountriesService, UsersService, UniversitiesService, DatePipe, ErrorService],
   bootstrap: [AppComponent]
})
export class AppModule { }
