import {Component, OnInit} from '@angular/core';
import {UsersService} from './user/users.service';
import {LoginComponent} from './login/login.component';
import {User} from './user/user';
import {environment} from '../environments/environment';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataUrl = environment.dataUrl;
  title = 'app';
  selfUser: User;
  isSuperuser: boolean;

  constructor(private usersService: UsersService, private authService:AuthService) {
  }

  ngOnInit() {
    if (localStorage.getItem('auth_token')) {
      AuthService.token = localStorage.getItem('auth_token');
      this.usersService.getSelf().subscribe(user => {
        this.authService.setUser(user);
        this.setUser();
      });
    }
  }

  setUser() {
    this.selfUser = AuthService.selfUser;
    this.isSuperuser = AuthService.isSuperuser;
  }

  logOut() {
    this.authService.logOut();
    this.selfUser = null;
    this.isSuperuser = null;
  }
}
