import { ResultComponent } from './result.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatSortModule, MatTableModule} from '@angular/material';
import { AngularMaterialModule } from './../../../angular-material/angular-material.module';

@NgModule({

    declarations: [
        ResultComponent,
    ],

    imports: [
        CommonModule,
        AngularMaterialModule,
        MatTableModule,
        MatSortModule,
        BrowserModule,
    ],

    bootstrap: [ResultComponent],
    exports: [ResultComponent],
    providers: [],
    
})
export class ResultModule { }
