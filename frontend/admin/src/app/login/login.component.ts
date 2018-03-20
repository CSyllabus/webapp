import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {UsersService} from "../user/users.service";

declare let window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  hide = true;
  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private usersService: UsersService, private dialog: MatDialog) {
  }


  @Output() token = new EventEmitter<string>();

  submitLogIn() {
    if (this.username && this.password) {
      let data = {'username': this.username, 'password': this.password};
      this.authService.submitLogIn(data).subscribe(response => {
          this.authService.setToken(response.token);
          this.usersService.getSelf().subscribe(user => {
            this.authService.setUser(user);
            this.token.emit('');
          });
        }, error => {
          this.passwordFormControl.setErrors({'incorrect': true});
          this.usernameFormControl.setErrors({'incorrect': true});
        }
      );
    }

  }
}
