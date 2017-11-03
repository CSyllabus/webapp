import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { Result } from './result';
import 'rxjs/add/observable/fromEvent';

/* -*- coding: utf - 8 -*-
# @Author: Adrien Roques
# @title: ExplorerResult
# @Date: 2017 - 11 - 03
# @Last Modified by: Adrien Roques
# @Last Modified time: 2017 - 11 - 03
# @Description: Manage graphics datas*/
export class ExplorerResult {

    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Result[]> = new BehaviorSubject<Result[]>([]);
    get data(): Result[] { return this.dataChange.value; }

    constructor() {
 
    }

    /** Adds a new result to the database graphic. */
    addResult() {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewResult());
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new result. */
    private createNewResult() {

        return {
            id: (this.data.length + 1).toString(),
            score: score,
            country: country,
            university: university,
            professor: professor,
            syllabus: syllabus
        };
    }
}
