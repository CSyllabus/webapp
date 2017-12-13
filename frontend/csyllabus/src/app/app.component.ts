import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * AppComponent parent node
 * <p>
 * @author CSyllabus Team
 */
export class AppComponent implements OnInit {

  /**
   * title {@link string} instance representing the name of csyllabus website.
   */
  title = 'CSyllabus';

  /**
   * @constructor create AppComponent object.
   */
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() {
  }
}
