import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from './../angular-material/angular-material.module';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  backgroundImage: String;
  constructor() { }

  ngOnInit() {
  }

  changeBackgroundImage($event) {
    this.backgroundImage = $event;
  }
}
