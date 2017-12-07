import { NavbarComponent } from './navbar/navbar.component';
import {AngularMaterialModule} from './../angular-material/angular-material.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '.././app.routes';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [NavbarComponent,FooterComponent],
})
export class AlwayspresentModule {
}
