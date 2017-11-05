import { ExplorerModule } from './explorer/explorer/explorer.module';
import { ResultModule } from './explorer/result/result.module'
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ExplorerModule,
    ResultModule
  ],
  declarations: [
    CoreComponent
  ],
  exports: [CoreComponent]
})
export class CoreModule { }
