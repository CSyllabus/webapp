import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, Event as NavigationEvent} from "@angular/router";
import {EventsService} from "./services/events.service";
declare let ga: Function;

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
  constructor(private router: Router, private eventsService: EventsService) {
    router.events.forEach((event: NavigationEvent) => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
        let data = {'event_type': 'page_hit', 'event_data': event.urlAfterRedirects};
        this.eventsService.emitEvent(data).subscribe(()=>{});
      }
    });

    }

  /**
   * ngOnInit
   */
  ngOnInit() {
  }
}
