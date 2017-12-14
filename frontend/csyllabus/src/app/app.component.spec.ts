import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent} from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {AngularMaterialModule} from "./angular-material/angular-material.module";
import {NgModule} from "@angular/core";
import {of} from "rxjs/observable/of";
import {City} from "./classes/city";


@NgModule({
  declarations: [NavbarComponent],
  entryComponents: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
})
class TestModule { }

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let app;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TestModule],
      providers: [],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'CSyllabus'`, async(() => {
    expect(app.title).toEqual('CSyllabus');
  }));
  it('should ngOnInit() call', async(() => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));
});
