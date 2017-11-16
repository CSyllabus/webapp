import {ExplorerModule} from './explorer/explorer.module';
import {AngularMaterialModule} from './../angular-material/angular-material.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreComponent} from './core.component';
import {ResultCardsComponent} from './result-cards/result-cards.component';
import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '.././app.routes';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ExplorerModule,
    RouterModule.forRoot(ROUTES),
  ],
  declarations: [
    CoreComponent,
    ResultCardsComponent
  ],
  exports: [CoreComponent]
})
export class CoreModule {
}
