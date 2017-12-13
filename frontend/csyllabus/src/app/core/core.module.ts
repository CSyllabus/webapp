import { AlwayspresentModule } from './../components/alwayspresent.module';
import { CourseDialogComponent } from './result-cards-comparator/course-dialog/course-dialog.component';
import { CoreComponent } from './core.component';

import { ExplorerModule } from './explorer/explorer.module';
import { ComparatorModule } from './comparator/comparator.module';

import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultCardsComponent } from './result-cards/result-cards.component';
import { ResultCardsComparatorComponent } from './result-cards-comparator/result-cards-comparator.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from '.././app.routes';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ExplorerModule,
    ComparatorModule,
    RouterModule.forRoot(ROUTES),
    AlwayspresentModule
  ],
  declarations: [
    CoreComponent,
    ResultCardsComponent,
    ResultCardsComparatorComponent,
    CourseDialogComponent

  ],
  exports: [CoreComponent],
  entryComponents: [CourseDialogComponent],
})
export class CoreModule {
}
