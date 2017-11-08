import { CoursesService } from './../../../services/courses.service';
import { AngularMaterialModule } from './../../../angular-material/angular-material.module';
import { Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormControlDirective} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

/* -*- coding: utf - 8 -*-
# @Author: Sebastian
# @title: TableFilteringExplorer
# @Date: 2017 - 11 - 03
# @Last Modified by: Adrien Roques
# @Last Modified time: 2017 - 11 - 05
# @Description: */
export class ExplorerComponent implements OnInit {

    constructor(
        private coursesService:CoursesService,
    ) {    
    }

    filteredOptions: Observable<string[]>;
    
    ngOnInit() { 
        
        console.log(this.coursesavailable);
        console.log(this.Array);
    }
    levels = [
        { value: 'A1', viewValue: 'A1' },
        { value: 'A2', viewValue: 'A2' },
        { value: 'B1', viewValue: 'B1' },
        { value: 'B2', viewValue: 'B2' },
        { value: 'C1', viewValue: 'C1' },
        { value: 'C2', viewValue: 'C2' }
    ];
    semesters = [
        { value: 1, viewValue: 1 },
        { value: 2, viewValue: 2 }
    ];
    Array =["hola","adios"]
   coursesavailable=this.coursesService.getAllCourses().subscribe(courses=>this.coursesavailable=courses); 
    controlcourses: FormControl = new FormControl();
}
