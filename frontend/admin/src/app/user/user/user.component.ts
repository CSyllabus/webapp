import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../course/course';
import {User} from '../user';
import {environment} from '../../../environments/environment';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  user: User;
  newPassword: string;
  newPassword2: string;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', );
  password2 = new FormControl('', );
  constructor(private usersService: UsersService, private route: ActivatedRoute) {
    this.usersService.getSelf().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  saveUser() {
    if (this.newPassword && (this.newPassword === this.newPassword2)){
      this.user['newPassword'] = this.newPassword;
    }
    this.usersService.putSelf(this.user).subscribe(res => {
      alert("Succesfully saved :)");
      this.usersService.getSelf().subscribe(user => {
        this.user = user;
      });
    }, error => alert(error));
  }

}
