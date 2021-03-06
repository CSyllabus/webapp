import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {UsersService} from '../users.service';
import {User} from '../user';
import {DataSource} from '@angular/cdk/table'
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router} from '@angular/router';

declare let window: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  isadmin: boolean;
  displayedColumns = ['id', 'modified', 'username', 'actions'];
  dataSource: UserDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalItems: number;

  constructor(http: Http, private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {

    this.usersService.checkUser().subscribe(res => {
      this.isadmin = res;

      if (this.isadmin) {
        this.usersService.getUsersCount().subscribe(count => {
          this.totalItems = count;
        });

        this.dataSource = new UserDataSource(this.usersService, this.sort, this.paginator);
      } else {
        this.router.navigate(['home']);
      }

    });


  }

  deleteUser(user) {
    if (confirm('Warning, this action cannot be undone!')) {
      this.dataSource.deleteUser(user.id);
    }
  }

}


export class UserDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }


  constructor(private usersService: UsersService, private _sort: MatSort, private _paginator: MatPaginator) {
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

  data = new BehaviorSubject<User[]>([]);

  connect(): Observable<User[]> {
    return this.data.asObservable();
  }

  disconnect() {
  }

  fetchData() {
    let offset = this._paginator.pageIndex * this._paginator.pageSize;
    this.usersService.getAllUsers(this._paginator.pageSize, offset, this._sort.active, this._sort.direction, this.filter.toLowerCase()).subscribe(users => {
      this.data.next(users);
    });
  }

  deleteUser(userId) {
    this.usersService.deleteUser(userId).subscribe(complete => {
      let offset = this._paginator.pageIndex * this._paginator.pageSize;

      this.usersService.getAllUsers(this._paginator.pageSize, offset, this._sort.active, this._sort.direction, this.filter.toLowerCase()).subscribe(users => {
        this.data.next(users);
      });
    });
  }


}
