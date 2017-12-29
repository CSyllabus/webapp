import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../auth.service'
declare let window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private snackBar: MatSnackBar, private authService: AuthService) {
  }

  ngOnInit() {
    let messages = [
      'Hello handsome.',
      'Nice to see you again.',
      'Is that a new haircut?'
    ];
    let random_message = Math.floor(messages.length * Math.random());

    /*let snackBarRef = this.snackBar.open(messages[random_message], 'Close', {
     duration: 3000
     });*/
  }

  ngAfterViewInit() {
    //random messages container


    //random images url container
    let images = [
      "url('/assets/img/solar-panel-array-power-plant-electricity-power-159160.jpeg')",
      "url('/assets/img/hill-2165759_1920.jpg')",
      "url('/assets/img/tianjin-2185510_1920.jpg')"
    ];


    let random_image = Math.floor(images.length * Math.random());
    document.body.style.backgroundImage = images[random_image];

    let dialog = document.querySelector('dialog');
    /* if (! dialog.showModal) {
     dialogPolyfill.registerDialog(dialog);
     }

     dialog.querySelector('.close').addEventListener('click', function() {
     dialog.close();
     });*/
    //display snackbar


  }

  @Output() token = new EventEmitter<string>();

  submitLogIn() {
    let data = {}
    data['username'] = this.username;
    data['password'] = this.password;

    this.authService.submitLogIn(data).subscribe(response => {
      this.token.emit(response.token);

    }, error => alert('Wrong password.'));
  }
}
