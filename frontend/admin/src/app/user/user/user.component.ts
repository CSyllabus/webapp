import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  user_id: number;
  task: string;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',);
  password2 = new FormControl('',);

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user_id = +params['id'];
      this.task = params['task'];

      if (this.task === 'edit' && this.user_id) {
        this.usersService.getUser(this.user_id).subscribe(user => {
          this.user = user;
        });
      } else if (this.task === 'self') {
        this.usersService.getSelf().subscribe(user => {
          this.user = user;
        });
      } else if (this.task === 'add') {
        this.user = new User();
      }

    });

  }

  saveUser() {
    if (this.newPassword && (this.newPassword === this.newPassword2)) {
      this.user['newPassword'] = this.newPassword;
    }

    if (this.task === 'edit' && this.user_id) {
      this.usersService.putUser(this.user_id, this.user).subscribe(res => {
        alert("Succesfully saved edit :)");
        this.usersService.getUser(this.user_id).subscribe(user => {
          this.user = user;
        });
      }, error => alert(error));
    } else if (this.task === 'self') {
      this.usersService.putSelf(this.user).subscribe(res => {
        alert("Succesfully saved :)");
        this.usersService.getSelf().subscribe(user => {
          this.user = user;
        });
      }, error => alert(error));
    } else if (this.task === 'add' && this.user['newPassword']) {
      this.usersService.postUser(this.user).subscribe(res => {
        alert("Succesfully saved add :)");
      }, error => alert(error));
    }


  }


}
