import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Result } from './result'

/** Constants used to fill up our data base. */ //TEST DATA 
const SCORE = ['10', '20', '60', '55', '40', '80'];
const BLAZON = ['https://source.unsplash.com/user/erondu/200x200',
    'https://source.unsplash.com/user/erondu/200x200',
    'https://source.unsplash.com/user/erondu/200x200',
    'https://source.unsplash.com/user/erondu/200x200',
    'https://source.unsplash.com/user/erondu/200x200'];
const COUNTRY = ['FRANCE', 'US', 'ITALY', 'CROATIA', 'FRANCE', 'UK'];
const UNIVERSITY = ['IUT', 'POLIMI', 'STANFORD', 'ZAGREB', 'PARIS1', 'OXFORD'];
const PROFESSOR = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack'];
const SYLLABUS = ['Machine Learning', 'Computer Science', 'Embbeded System', 'Software Control', ' Computer Performance ', 'DataBase'];
const DESCRIPTION = ['Computer science is the study of the theory, experimentation, and engineering that form the basis for the design and use of computers. It is the scientific and practical approach to computation and its applications and the systematic study of the feasibility, structure, expression, and mechanization of the methodical procedures (or algorithms) that underlie the acquisition, representation, processing, storage, communication of, and access to information.',
    ' An alternate, more succinct definition of computer science is the study of automating algorithmic processes that scale. A computer scientist specializes in the theory of computation and the design of computational systems.[1]Its fields can be divided into a variety of theoretical and practical disciplines.Some fields, such as computational complexity theory (which explores the fundamental properties of computational and intractable problems)',
    ' An alternate, more succinct definition of computer science is the study of automating algorithmic processes that scale. A computer scientist specializes in the theory of computation and the design of computational systems.[1]Its fields can be divided into a variety of theoretical and practical disciplines.Some fields, such as computational complexity theory (which explores the fundamental properties of computational and intractable problems)',
    ' An alternate, more succinct definition of computer science is the study of automating algorithmic processes that scale. A computer scientist specializes in the theory of computation and the design of computational systems.[1]Its fields can be divided into a variety of theoretical and practical disciplines.Some fields, such as computational complexity theory (which explores the fundamental properties of computational and intractable problems)',
    ' An alternate, more succinct definition of computer science is the study of automating algorithmic processes that scale. A computer scientist specializes in the theory of computation and the design of computational systems.[1]Its fields can be divided into a variety of theoretical and practical disciplines.Some fields, such as computational complexity theory (which explores the fundamental properties of computational and intractable problems)'];
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
        const description = DESCRIPTION[Math.round(Math.random() * (DESCRIPTION.length - 1))];
        const blazon = BLAZON[Math.round(Math.random() * (BLAZON.length - 1))];

        return {
            score: score,
            country: country,
            university: university,
            professor: professor,
            syllabus: syllabus,
            description: description,
            blazon: blazon
        };
    }
}

