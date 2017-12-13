import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search-dialog',
  templateUrl: 'search-dialog.html',
})

/**
 * SearchDialogComponent object is displayed when an user
 * do not respect the search conditions on the comparator
 * <p>
 * @author CSyllabus Team
 */
export class SearchDialogComponent {

  /**
   * @constructor create SearchDialogComponent object.
   * @param dialogRef The {@link MatDialogRef<SearchDialogComponent>} instance representing SearchDialogComponent.
   * @param data The {@link MAT_DIALOG_DATA} instance representing MAT_DIALOG_DATA.
   */
  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  /**
   * onNoClick close dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
