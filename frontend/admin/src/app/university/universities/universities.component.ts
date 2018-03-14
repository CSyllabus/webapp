import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {UniversitiesService} from '../universities.service';
import {UsersService} from '../../user/users.service';
import {University} from '../university';
import {environment} from '../../../environments/environment';
import {CdkTable, DataSource} from '@angular/cdk/table'
import {ActivatedRoute, Router} from '@angular/router';
import {CdkTableModule} from '@angular/cdk/table';
import {Http, Response} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {MatSort, MatSortModule} from '@angular/material';
import {MatPaginator} from '@angular/material';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
declare let window: any;

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css']
})
export class UniversitiesComponent implements OnInit {

  newUniversity: University;
  proba: number;

  universities: University[];
  displayedColumns = ['id', 'modified', 'name', 'actions'];
  dataSource: UniversityDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filteredUniversities: University[] = [];
  totalItems: number;
  searchString: String = "";
  user_id: String;

  constructor(http: Http, private universitiesService: UniversitiesService, private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {

    this.newUniversity = new University();
    this.universitiesService.getUniversitiesCount().subscribe(count => {
      this.totalItems = count;
    });


    this.dataSource = new UniversityDataSource(this.universitiesService, this.sort, this.paginator);
  }

  deleteUniversity(university) {
    if (confirm('You sure you want to delete this university?')) {
      this.dataSource.deleteUniversity(university.id);
    }
  }

  addUniversity() {
    this.router.navigate(['university/add/']);
  }

}


export class UniversityDataSource extends DataSource<University> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }


  constructor(private universitiesService: UniversitiesService, private _sort: MatSort, private _paginator: MatPaginator) {
    super();

    this._paginator.pageSize = 10;
    this._paginator.pageIndex = 0;

    this.fetchData();

    this._sort.sortChange.subscribe(() => {
      this.fetchData();
    });

    this._paginator.page.subscribe(() => {
      this.fetchData();
    });

  }

  data = new BehaviorSubject<University[]>([]);

  connect(): Observable<University[]> {
    return this.data.asObservable();
  }

  disconnect() {
  }

  fetchData() {

    let offset = this._paginator.pageIndex * this._paginator.pageSize;
    this.universitiesService.getAllUniversities(this._paginator.pageSize, offset, this._sort.active, this._sort.direction, this.filter.toLowerCase()).subscribe(universities => {
      this.data.next(universities);
    });
  }

  deleteUniversity(universityId) {
    this.universitiesService.deleteUniversity(universityId).subscribe(complete => {
      let offset = this._paginator.pageIndex * this._paginator.pageSize;
      this.fetchData();
    });

  }

}
