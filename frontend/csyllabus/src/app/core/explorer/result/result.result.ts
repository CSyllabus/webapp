import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Result } from './result'

/** Constants used to fill up our data base. */ //TEST DATA 
const SCORE = ['10', '20', '60', '55', '40', '80'];
const COUNTRY = ['FRANCE', 'US', 'ITALY', 'CROATIA', 'FRANCE', 'UK'];
const UNIVERSITY = ['IUT', 'POLIMI', 'STANFORD', 'ZAGREB', 'PARIS1', 'OXFORD'];
const PROFESSOR = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack'];
const SYLLABUS = ['1', '2', '3', '4', '5', '6'];

/* -*- coding: utf - 8 -*-
# @Author: Adrien Roques
# @title: ExplorerResult
# @Date: 2017 - 11 - 03
# @Last Modified by: Adrien Roques
# @Last Modified time: 2017 - 11 - 03
# @Description: Manage graphics datas*/
export class ResultExplorer {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Result[]> = new BehaviorSubject<Result[]>([]);
    get data(): Result[] { return this.dataChange.value; }

    constructor() {
        // Fill up the database with 5 rows test function, not connencted yet
        for (let i = 0; i < 5; i++) { this.addRow(); }
    }

    /** Adds a new row to the database. */
    addRow() {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewRow());
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new row. */
    private createNewRow() {

        //TODO DELETE WHEN CONNECTED
        const score = SCORE[Math.round(Math.random() * (SCORE.length - 1))];
        const country = COUNTRY[Math.round(Math.random() * (COUNTRY.length - 1))];
        const university = UNIVERSITY[Math.round(Math.random() * (UNIVERSITY.length - 1))];
        const professor = PROFESSOR[Math.round(Math.random() * (PROFESSOR.length - 1))];
        const syllabus = SYLLABUS[Math.round(Math.random() * (SYLLABUS.length - 1))];

        return {
            score: score,
            country: country,
            university: university,
            professor: professor,
            syllabus: syllabus
        };
    }
}

