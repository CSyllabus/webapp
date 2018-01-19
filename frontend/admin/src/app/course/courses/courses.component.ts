import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {CoursesService} from '../courses.service';
import {UsersService} from '../../user/users.service';
import {Course} from '../course';
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
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  newCourse: Course;
  proba: number;

  courses: Course[];
  displayedColumns = ['id', 'modified', 'name', 'actions'];
  dataSource: CourseDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filteredCourses: Course[] = [];
  totalItems: number;
  searchString: String = "";
  user_id: String;

  constructor(http: Http, private coursesService: CoursesService, private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {

    this.newCourse = new Course();
    this.coursesService.getCoursesCount().subscribe(count => {
      this.totalItems = count;
    });


    this.dataSource = new CourseDataSource(this.coursesService, this.sort, this.paginator);
  }

  deleteCourse(course) {
    if (confirm('You sure you want to delete this course?')) {
      this.dataSource.deleteCourse(course.id);
    }
  }

  addCourse() {
    this.router.navigate(['course/add/']);
  }

}


export class CourseDataSource extends DataSource<Course> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }


  constructor(private coursesService: CoursesService, private _sort: MatSort, private _paginator: MatPaginator) {
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

  data = new BehaviorSubject<Course[]>([]);

  connect(): Observable<Course[]> {
    return this.data.asObservable();
  }

  disconnect() {
  }

  fetchData() {

    let offset = this._paginator.pageIndex * this._paginator.pageSize;
    this.coursesService.getAllCoursesByUser(this._paginator.pageSize, offset, this._sort.active, this._sort.direction, this.filter.toLowerCase()).subscribe(courses => {
      this.data.next(courses);
    });
  }

  deleteCourse(courseId) {
    this.coursesService.deleteCourse(courseId).subscribe(complete => {
      let offset = this._paginator.pageIndex * this._paginator.pageSize;
      this.fetchData();
    });

  }

}
