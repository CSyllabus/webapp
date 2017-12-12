import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {By} from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('a'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should myFunction call topnav', () => {
    const x = document.getElementById('myTopnav');
    spyOn(component, 'myFunction').and.callThrough();
    component.myFunction();
    expect(x.className).toEqual('topnav responsive');
  });

  it('should myFunction call topnav responsive', () => {
    const x = document.getElementById('myTopnav');
    x.className = 'test';
    spyOn(component, 'myFunction').and.callThrough();
    component.myFunction();
    expect(x.className).toEqual('topnav');
  });

});



