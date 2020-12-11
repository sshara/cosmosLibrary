import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DeleteBookComponent>) { }

  ngOnInit(): void {
  }

  accept(){
    this._dialogRef.close(true);
  }

}
