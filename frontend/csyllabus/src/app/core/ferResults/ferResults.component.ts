import { Component, OnInit, Input } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  selector: 'explorer-result',
  templateUrl: './ferResult.component.html',
  styleUrls: ['./ferResult.component.css']
})
export class FerResultsComponent implements OnInit {
 @Input() courses: any;

  constructor() { }

  ngOnInit() {
  }


}
