import { AngularMaterialModule } from './../../../angular-material/angular-material.module';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResultExplorer } from './result.result';
import { Result } from './result';
// flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { ObservableMedia } from '@angular/flex-layout';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
    selector: 'app-explorer-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})


/* -*- coding: utf - 8 -*-
# @Author: Adrien Roques 
# @title: TableFilteringExplorer
# @Date: 2017 - 11 - 03
# @Last Modified by: Adrien Roques
# @Last Modified time: 2017 - 11 - 10
# @Description: Manage the table of search result and apply filter*/
export class ResultComponent implements OnInit {

    /**
     * The number of colums in the md-grid-list directive.
    */
    public cols: Observable<number>;

    constructor(private observableMedia: ObservableMedia) { }

    displayedColumns = ['result'];
    resultExplorer = new ResultExplorer();
    dataSource: FilterRows | null;

    // apply filter
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

    size: string = '4';

    //menu button
    @ViewChild(MatMenuTrigger) notificationMenuBtn: MatMenuTrigger;

    menuMethod() {
        this.notificationMenuBtn.openMenu();
    }
}

/* -*- coding: utf - 8 -*-
# @Author: Adrien Roques
# @title: Filter
# @Date: 2017 - 11 - 04
# @Last Modified by: Adrien Roques
# @Last Modified time: 2017 - 11 - 10
# @Description: Apply filter*/
export class FilterRows extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    /** size displaying*/
    size: string = '';

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

        this.size = this._resultExplorer.data.filter.length.toString();

        return Observable.merge(...displayDataChanges).map(() => {
            return this._resultExplorer.data.slice().filter((item: Result) => {
                let searchStr = (item.score + item.university + item.country + item.professor + item.syllabus).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
        });

    }


    disconnect() { }
}

