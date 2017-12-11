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
  chooserSelectedExplorer: Boolean;
  chooserSelectedComparator: Boolean;


  constructor() {
  }



  ngOnInit() {
    this.explorerTab = true;
    this.comparatorTab = false;

    var str = "<p>We have 625 courses from 10 universities!</p>",
    i = 0,
    isTag,
    text;



  (function type() {
      text = str.slice(0, ++i);
      if (text === str) return;

      document.getElementById('typewriter').innerHTML = text;

      var char = text.slice(-1);
      if( char === '<' ) isTag = true;
      if( char === '>' ) isTag = false;

      if (isTag) return type();
      setTimeout(type, 80);
  }());
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

  chooserSelect(action: string){
  if (action === 'explorer') {
    this.chooserSelectedExplorer=true;
    this.chooserSelectedComparator=false;
  } else if (action === 'comparator') {
    this.chooserSelectedExplorer=false;
    this.chooserSelectedComparator=true;
  }

  setTimeout(function () {
      (<HTMLInputElement>document.getElementById('filters-container')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, 100);

  }
}
