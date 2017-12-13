import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { UsersService } from './user/users.service';
import { LoginComponent } from './login/login.component';
import { User } from './user/user';
import { environment } from '../environments/environment';

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

  constructor(private snackBar: MatSnackBar, private usersService: UsersService) { }

  ngOnInit() {
    let messages = [
      'Hello handsome.',
      'Nice to see you again.',
      'Is that a new haircut?'
    ];
    let random_message = Math.floor(messages.length * Math.random());

   /* let snackBarRef = this.snackBar.open(messages[random_message], 'Close', {
     duration: 3000
     });
*/
    if (localStorage.getItem("auth_token")) {
		  this.token = localStorage.getItem("auth_token");
      this.usersService.getSelf().subscribe(user => {
        this.selfUser = user;
      });
    }
  }

  setToken(token: string){
	  this.token = token;
    localStorage.setItem("auth_token", token);
    this.usersService.getSelf().subscribe(user => {
      this.selfUser = user;
    });
  }

  logOut(){
    localStorage.removeItem("auth_token");
    this.selfUser = null;
	  this.token = null;
  }
}
