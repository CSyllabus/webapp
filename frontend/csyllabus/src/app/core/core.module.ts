import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { ExplorerComponent } from './explorer/explorer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [
    ExplorerComponent,CoreComponent
  ],
  exports: [CoreComponent]
})
export class CoreModule { }
