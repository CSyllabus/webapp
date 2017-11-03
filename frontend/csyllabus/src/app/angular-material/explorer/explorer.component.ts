import { AngularMaterialModule } from './../angular-material.module';
import {FormControl} from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

/**
* @title Explorer Web page
*/
@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

 /* -*- coding: utf - 8 -*-
 # @Author: Adrien Roques
 # @title: TableFilteringExplorer
 # @Date: 2017 - 11 - 03
 # @Last Modified by: Adrien Roques
 # @Last Modified time: 2017 - 11 - 03
 # @Description: Manage the table of search result and apply filter*/
export class TableFiltering {
    displayedColumns = ['Score', 'Country', 'University', 'Professor', 'Syllabus'];

    @ViewChild('filter') filter: ElementRef;
}

export class ExplorerComponent implements OnInit {
    s
  constructor() { }

  ngOnInit() {
  }
  levels = [
      {value: 'A1', viewValue: 'A1'},
      {value: 'A2', viewValue: 'A2'},
      {value: 'B1', viewValue: 'B1'},
      {value: 'B2', viewValue: 'B2'},
      {value: 'C1', viewValue: 'C1'},
      {value: 'C2', viewValue: 'C2'}
  ];
}

