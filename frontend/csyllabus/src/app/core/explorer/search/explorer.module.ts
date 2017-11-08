import { ExplorerComponent } from './explorer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../../../angular-material/angular-material.module';
import { Form, ReactiveFormsModule } from '@angular/forms';

@NgModule({

    declarations: [
        ExplorerComponent,
    ],

    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule
        
    ],

    exports: [ExplorerComponent],
    
})
export class ExplorerModule { }
