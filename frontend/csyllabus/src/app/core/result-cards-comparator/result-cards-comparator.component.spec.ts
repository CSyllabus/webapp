import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultCardsComparatorComponent } from './result-cards-comparator.component';

import {CoreComponent} from '../core.component';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';



import {Http, HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
describe('ExplorerComponent', () => {
  let component: ResultCardsComparatorComponent;
  let fixture: ComponentFixture<ResultCardsComparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultCardsComparatorComponent ],
      imports: [

        RouterTestingModule.withRoutes([]),
        AngularMaterialModule,
        BrowserAnimationsModule
      ],
      providers: [

      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCardsComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
