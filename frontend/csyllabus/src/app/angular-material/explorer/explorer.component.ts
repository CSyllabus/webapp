import { AngularMaterialModule } from './../angular-material.module';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

/**
* @title Explorer Web page
*/
@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

export class TableExplorer {
    displayedColumns = ['Score', 'Country', 'University', 'Professor', 'Syllabus'];
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

