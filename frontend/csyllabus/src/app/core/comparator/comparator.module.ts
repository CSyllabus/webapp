import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComparatorComponent} from './comparator.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {SearchDialogComponent} from "./search-dialog/search-dialog.component";

@NgModule({

  declarations: [
    ComparatorComponent,
    SearchDialogComponent,
  ],

  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [],
  exports: [ComparatorComponent],

})
export class ComparatorModule {
}
