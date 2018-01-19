import {CoursesService} from './../../services/courses.service';
import {Comment} from './../../classes/comment';
import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "angular4-social-login";
import {FacebookLoginProvider, GoogleLoginProvider} from "angular4-social-login";
import {SocialUser} from "angular4-social-login";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  val: string;
  comments: any = [];
  user: SocialUser;
  loggedIn: boolean;
  @Input() courseId: number;
  @Input() title: string;
  @Input() university: string;
  @Input() country: string;
  @Input() description: string;
  public url: string;

  constructor(private authService: AuthService, private coursesService: CoursesService) {

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log(this.user);
    console.log(this.loggedIn);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  signOut(): void {
    this.authService.signOut();
    this.user = null;
    this.loggedIn = null;
    console.log(this.user);
    console.log(this.loggedIn);
  }

  newComment(user) {

    this.coursesService.insertAnewComment(this.courseId, {author: user, content: this.val}).subscribe(
      res => {
        this.refreshComments();
      },
      err => {
        this.refreshComments();
      }
    );

  }

  deleteComment(commentId) {
    this.coursesService.deleteComment(commentId).subscribe(
      res => {
        this.refreshComments();
      },
      err => {
        this.refreshComments();
      }
    )
  }

  refreshComments() {
    this.comments = [];
    this.coursesService.getAllCommentsByCourse(this.courseId).subscribe(res => {
      this.comments = res;
    });
  }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    this.coursesService.getAllCommentsByCourse(this.courseId).subscribe(res => {
      this.comments = res;
    });

  }

}
