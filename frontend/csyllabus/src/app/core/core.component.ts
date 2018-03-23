import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, Event as NavigationEvent} from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css', '../components/documentation/documentation.component.css']
})
export class CoreComponent implements OnInit {
  explorerTab: boolean;
  comparatorTab: boolean;
  getStart: boolean = false;
  chooserSelectedExplorer: Boolean;
  chooserSelectedComparator: Boolean;

  constructor(private router: Router) {
    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.indexOf('explorer') !== -1) {
          this.getStart = true;
          this.chooserSelect('explorer');
          this.scrollToHtmlElement('filters-container', 1000);
        } else if (event.urlAfterRedirects.indexOf('comparator') !== -1) {
          this.getStart = true;
          this.chooserSelect('comparator');
          this.scrollToHtmlElement('filters-container', 1000);
        }
      }
    });
  }

  ngOnInit() {
    this.explorerTab = true;
    this.comparatorTab = false;

  }

  chooserSelect(action: string) {
    if (action === 'explorer') {
      this.chooserSelectedExplorer = true;
      this.chooserSelectedComparator = false;
    } else if (action === 'comparator') {
      this.chooserSelectedExplorer = false;
      this.chooserSelectedComparator = true;
    }

    this.scrollToHtmlElement('filters-container', 100);
  }

  getStarted() {
    this.getStart = true;
    this.scrollToHtmlElement('start', 100);
  }

  scrollToHtmlElement(id, timeout) {
    setTimeout(function () {
      (<HTMLInputElement>document.getElementById(id)).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, timeout);
  }

  /*
    startString() {

      var str = "<p>We have 586 courses from 4 universities!</p>",
        i = 0,
        isTag,
        text;

      (function type() {
        text = str.slice(0, ++i);
        if (text === str) return;

        document.getElementById('typewriter').innerHTML = text;

        var char = text.slice(-1);
        if (char === '<') isTag = true;
        if (char === '>') isTag = false;

        if (isTag) return type();
        setTimeout(type, 80);
      }());
    }
  */

}
