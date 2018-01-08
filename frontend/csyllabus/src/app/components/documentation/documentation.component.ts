import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent{

  constructor() { }


  getStarted(action: string) {

    setTimeout(function () {
      (<HTMLInputElement>document.getElementById('one')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, 100);

  }
}
