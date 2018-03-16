import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NavbarComponent} from './components/navbar/navbar.component';


import {CoreModule} from './core/core.module';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {AppComponent} from './app.component';
import {CoreComponent} from './core/core.component';
import {ExplorerComponent} from './core/explorer/explorer.component';
import {ComparatorComponent} from './core/comparator/comparator.component';
import {CourseComponent} from './components/course/course.component';

import {CountriesService} from './services/countries.service';
import {CitiesService} from './services/cities.service';
import {CoursesService} from './services/courses.service';
import {FacultiesService} from './services/faculties.service';
import {ProgramsService} from './services//programs.service';
import {UniversitiesService} from './services/universities.service';
import {ROUTES} from './app.routes';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {FooterComponent} from './components/footer/footer.component'
import {DocumentationComponent} from './components/documentation/documentation.component';
import {SocialLoginModule, AuthServiceConfig} from "angular4-social-login";
import {GoogleLoginProvider, FacebookLoginProvider} from "angular4-social-login";
import {SocialComponent} from './components/social/social.component';
import {ShareButtonsModule} from 'ngx-sharebuttons';
let config = new AuthServiceConfig([

  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("857138050861-s08aegqj7nfsphce414csh0q0tj4af2e.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1924326714550299")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    ShareButtonsModule.forRoot(),
  ],
  providers: [
    CountriesService,
    CitiesService,
    CoursesService,
    FacultiesService,
    ProgramsService,
    UniversitiesService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  declarations: [
    AppComponent,
    CourseComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    DocumentationComponent,
    SocialComponent
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
