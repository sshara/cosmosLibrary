import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _http: HttpClient) { }

  goTo(route: string): void {
    this._router.navigate(['/'+route]);
  }
}
