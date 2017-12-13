import {TestBed} from '@angular/core/testing';
import {MatDialogModule, MatDialog} from '@angular/material';
import { SearchDialogComponent } from './search-dialog.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SearchDialogComponent],
  entryComponents: [SearchDialogComponent],
  exports: [SearchDialogComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
})
class TestModule { }

describe('SearchDialogComponent explorer', () => {
  let component: SearchDialogComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, TestModule, AngularMaterialModule, CommonModule, BrowserAnimationsModule]
    });
  });

  beforeEach(()  => {
    dialog = TestBed.get(MatDialog);

    const dialogRef = dialog.open(SearchDialogComponent);

    component = dialogRef.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onNoClick call', () => {
    spyOn(component, 'onNoClick').and.callThrough();
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();
  });
});
