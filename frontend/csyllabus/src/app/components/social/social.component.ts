import { CoursesService } from './../../services/courses.service';
import { Comment } from './../../classes/comment';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  private comments: any = [];
  private user: SocialUser;
  private loggedIn: boolean;
  @Input() courseId: number;

  constructor(private authService: AuthService,private coursesService: CoursesService) {
    this.comments=this.coursesService.getAllCommentsByCourse( this.courseId);
   }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    })
  }

}
