import {Component, OnInit} from '@angular/core';
import {AngularMaterialModule} from './../angular-material/angular-material.module';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  explorerResult: any;
  comparatorResult: any;
  backgroundImage: String = null;
  explorerTab: boolean;
  comparatorTab: boolean;


  constructor() {
  }

  ngOnInit() {
    this.explorerTab = true;
    this.comparatorTab = false;
  }

  changeBackgroundImage($event) {
    this.backgroundImage = $event;
  }

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

  changeResultCard($event: any) {
    if ($event.index == 1) {
      this.explorerTab = false;
      this.comparatorTab = true;
    }
    else {
      this.explorerTab = true;
      this.comparatorTab = false;
    }

  }
}
