import { ExplorerModule } from './explorer/explorer.module';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ExplorerModule
  ],
  declarations: [
    CoreComponent
  ],
  exports: [CoreComponent]
})
export class CoreModule { }
