import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

/**
 * CoreComponent object displaying a Tab to choose
 * the Comparator object or Explorer Object. Some additionnal
 * graphic components was displayed :
 * - NavBar object to navigate on the csyllabus website
 * - Footer object displayed license
 * <p>
 * @author CSyllabus Team
 */
export class CoreComponent implements OnInit {

  /**
   * The {@link any} instance representing the explorer results courses.
   */
  explorerResult: any;
  /**
   * The {@link any} instance representing the comparator results courses.
   */
  comparatorResult: any;
  /**
   * The {@link string} instance representing the backgroundImage.
   */
  backgroundImage: String = null;
  /**
   *  The {@link boolean} instance representing if explorer is chosen or not.
   */
  explorerTab: boolean;

  /**
   * The {@link boolean} instance representing if comparator is chosen or not.
   */
  comparatorTab: boolean;

  /**
   * @constructor create CoreComponent object.
   */
  constructor() {
  }

  /**
   * ngOnInit default explorerTab displayed
   */
  ngOnInit() {
    this.explorerTab = true;
    this.comparatorTab = false;
  }

  /**
   * changeBackgroundImage update the background imahe when
   * a user change the value of anything fields
   * @param  {@link event} new event on click
   */
  changeBackgroundImage($event) {
    this.backgroundImage = $event;
  }

  /**
   * fetchExplorerResult scroll to explorer result
   * @param  {@link event} new event click
   */
  fetchExplorerResult($event) {
    this.explorerResult = $event;

    setTimeout(function () {
      (<HTMLInputElement>document.getElementById('explorer-result-component')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, 100);

  }

  /**
   * fetchComparatorResult scroll to comparator result
   * @param  {@link event} new event click
   */
  fetchComparatorResult($event) {
    this.comparatorResult = $event;

    setTimeout(function () {
      (<HTMLInputElement>document.getElementById('explorer-result-component')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, 100);
  }

  /**
   * changeResultCard change tab selection
   * @param  {@link event} new event click
   */
  changeResultCard($event: any) {
    if ($event.index === 1) {
      this.explorerTab = false;
      this.comparatorTab = true;
    } else {
      this.explorerTab = true;
      this.comparatorTab = false;
    }

  }
}
