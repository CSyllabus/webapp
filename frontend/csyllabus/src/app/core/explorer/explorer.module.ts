import { ExplorerComponent } from './explorer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatSortModule, MatTableModule} from '@angular/material';
import { AngularMaterialModule } from './../../angular-material/angular-material.module';

@NgModule({

    declarations: [
        ExplorerComponent,
    ],

    imports: [
        CommonModule,
        AngularMaterialModule,
        MatTableModule,
        MatSortModule,
        BrowserModule,
    ],

    bootstrap: [ExplorerComponent],
    exports: [ExplorerComponent],
    providers: [],
    
})
export class ExplorerModule { }
