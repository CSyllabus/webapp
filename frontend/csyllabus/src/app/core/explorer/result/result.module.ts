import { ResultComponent } from './result.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatSortModule, MatTableModule} from '@angular/material';
import { AngularMaterialModule } from './../../../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({

    declarations: [
        ResultComponent,
    ],

    imports: [
        CommonModule,
        FlexLayoutModule,
        AngularMaterialModule,
        MatTableModule,
        MatSortModule,
        BrowserModule,
    ],

    bootstrap: [ResultComponent],
    exports: [ResultComponent, AngularMaterialModule],
    providers: [],
    
})
export class ResultModule { }
