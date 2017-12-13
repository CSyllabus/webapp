import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../course/course';
import { User } from '../user';
import { environment } from '../../../environments/environment';

declare var window: any;

@Component({
  selector: 'app-category',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  dataUrl = environment.dataUrl;
  courses: Course[] = [];
  user: User;

  constructor(private usersService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    window.componentHandler.upgradeAllRegistered();
    /*this.route.params.subscribe(params => {
      this.usersService.getUserPosts(+params['id']).subscribe(posts => {
        this.posts = posts;
      });
      this.usersService.getUser(+params['id']).subscribe(user => {
        this.user = user;
      });

    });*/
  }

}
