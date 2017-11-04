import { AngularMaterialModule } from './../angular-material.module';
import {FormControl} from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResultExplorer } from './explorer.result';
import { Result } from './result';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
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

 /* -*- coding: utf - 8 -*-
 # @Author: Adrien Roques
 # @title: TableFilteringExplorer
 # @Date: 2017 - 11 - 03
 # @Last Modified by: Adrien Roques
 # @Last Modified time: 2017 - 11 - 04
 # @Description: Manage the table of search result and apply filter*/
export class TableFiltering {
    displayedColumns = ['score', 'country', 'university', 'professor', 'syllabus'];
    resultExplorer = new ResultExplorer();
    dataSource: FilterRows | null;

    @ViewChild('filter') filter: ElementRef;

    ngOnInit() {
        this.dataSource = new FilterRows(this.resultExplorer);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}

 /* -*- coding: utf - 8 -*-
 # @Author: Adrien Roques
 # @title: Filter
 # @Date: 2017 - 11 - 04
 # @Last Modified by: Adrien Roques
 # @Last Modified time: 2017 - 11 - 04
 # @Description: Apply filter*/
export class FilterRows extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private _resultExplorer: ResultExplorer) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Result[]> {
        const displayDataChanges = [
            this._resultExplorer.dataChange,
            this._filterChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this._resultExplorer.data.slice().filter((item: Result) => {
                let searchStr = (item.score + item.university + item.country + item.professor + item.syllabus).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
        });
    }

    disconnect() { }
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

