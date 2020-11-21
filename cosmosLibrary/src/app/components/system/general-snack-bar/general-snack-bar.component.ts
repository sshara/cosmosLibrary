import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-general-snack-bar',
  templateUrl: './general-snack-bar.component.html',
  styleUrls: ['./general-snack-bar.component.scss']
})
export class GeneralSnackBarComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<GeneralSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA)public information : any) { }

  ngOnInit(): void {
  }

  close(){
    this.snackBarRef.dismiss();
  }

}
