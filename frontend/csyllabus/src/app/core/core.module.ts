import { ExplorerModule } from './explorer/search/explorer.module';
import { ResultModule } from './explorer/result/result.module'
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import {ExplorerComponent} from './explorer/search/explorer.component';
import {FerResultsComponent} from "./ferResults/ferResults.component";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ExplorerModule,
    ResultModule
  ],
  declarations: [
    CoreComponent,
      FerResultsComponent
],
  exports: [CoreComponent]
})
export class CoreModule { }
