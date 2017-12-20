import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtpComponent } from './atp.component';

describe('AtpComponent', () => {
  let component: AtpComponent;
  let fixture: ComponentFixture<AtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
