import { ExplorerComponent } from './explorer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../../angular-material/angular-material.module';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [ExplorerComponent],
  exports: [ExplorerComponent]
})
export class ExplorerModule { }
