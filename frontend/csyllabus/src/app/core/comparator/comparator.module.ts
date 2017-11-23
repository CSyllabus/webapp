import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComparatorComponent} from './comparator.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {CourseComponent} from '../../components/course/course.component';
@NgModule({

  declarations: [
    ComparatorComponent
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
