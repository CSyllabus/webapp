

import {AngularMaterialModule} from './../angular-material/angular-material.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreComponent} from './core.component';
import {CourseDialogComponent} from './course-dialog/course-dialog.component';
import {ResultCardsComponent} from './result-cards/result-cards.component';
import {ResultCardsComparatorComponent} from './result-cards-comparator/result-cards-comparator.component';
import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '.././app.routes';

import {ExplorerComponent} from './explorer/explorer.component';
import {ComparatorComponent} from './comparator/comparator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CoreComponent,
    ResultCardsComponent,
    ResultCardsComparatorComponent,
    CourseDialogComponent,
    ExplorerComponent,
    ComparatorComponent
  ],
  exports: [CoreComponent],
  entryComponents: [CourseDialogComponent],
})
export class CoreModule {
}
