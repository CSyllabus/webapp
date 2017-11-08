import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExplorerComponent} from './explorer.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './../../../angular-material/angular-material.module';

@NgModule({

  declarations: [
    ExplorerComponent,
  ],

  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [ExplorerComponent],

})
export class ExplorerModule {
}
