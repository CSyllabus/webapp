import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { ExplorerComponent } from './explorer.component';

@NgModule({

  declarations: [
    ExplorerComponent,
    SearchDialogComponent,
  ],

  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [SearchDialogComponent],
  exports: [ExplorerComponent],

})
export class ExplorerModule {
}
