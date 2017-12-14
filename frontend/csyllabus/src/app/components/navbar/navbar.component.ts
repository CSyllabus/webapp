import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

/**
 * NavbarComponent object displaying navigation bar
 * <p>
 * @author CSyllabus Team
 */
export class NavbarComponent implements OnInit {

  /**
   * @constructor create FooterComponent object.
   */
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() { }

  /**
   * myFunction Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon
   */
  myFunction() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
  }
}
