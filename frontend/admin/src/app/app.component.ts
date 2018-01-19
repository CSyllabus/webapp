import {Component, OnInit} from '@angular/core';
import {UsersService} from './user/users.service';
import {LoginComponent} from './login/login.component';
import {User} from './user/user';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataUrl = environment.dataUrl;
  title = 'app';
  selfUser: User;
  token: string;
  isadmin: boolean;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    if (localStorage.getItem('auth_token')) {
      this.token = localStorage.getItem('auth_token');
      this.usersService.getSelf().subscribe(user => {
        this.selfUser = user;
      });
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
    this.usersService.getSelf().subscribe(user => {
      this.selfUser = user;
    });

    this.usersService.checkUser().subscribe(res => {
      this.isadmin = res;
    });
  }

  logOut() {
    localStorage.removeItem('auth_token');
    this.selfUser = null;
    this.token = null;
  }
}
