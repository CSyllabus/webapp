import {Component, OnInit} from '@angular/core';
import {AngularMaterialModule} from './../angular-material/angular-material.module';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  explorerResult: any;
  backgroundImage: String = null;

  constructor() {
  }

  ngOnInit() {
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
}
