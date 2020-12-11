import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeneralSnackBarComponent } from 'src/app/components/system/general-snack-bar/general-snack-bar.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  shoppingCartValue = new BehaviorSubject(this.shoppingCart);
  //cart =  {items:{isbn:amount}, total:number } 
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _http: HttpClient) { 
    }

  goTo(route: string): void {
    this._router.navigate(['/'+route]);
  }

  openSnackBar(data: any, component:any = GeneralSnackBarComponent) : MatSnackBarRef<any> {
    const snackRef = this._snackBar.openFromComponent(component, {
      data: data,
      duration: 4000,
      //panelClass: 'mat-message-snack-bar'
    });

    return snackRef;
  }

  openDialog(component: any, information?: any, close?: boolean) : MatDialogRef<any> {
    const dialogRef = this._dialog.open(component, 
      {
        data: information,
        hasBackdrop: true,
        panelClass: "custom-dialog",
        backdropClass: "backdrop-dialog",
        closeOnNavigation: true,
        disableClose:close
      }
    );
    return dialogRef;
  }

  assertInfo(data:any, form:any){
    let formKeys = Object.keys(form.value);
    for(let key of Object.keys(data)){
      if(! formKeys.includes(key)){
        delete data[key];
      }
    }

    formKeys = Object.keys(data);
    for(let key of Object.keys(form.value)){
      if(! formKeys.includes(key)){
        data[key] = '';
      }
    }

    for(let key of Object.keys(data)){
      if(key.toLowerCase().includes('password')){
        data[key] = '';
      }

      if(key.toLowerCase().includes('date') || key.toLowerCase().includes('year')){
        data[key] = new Date(data[key]);
      }
    }

    return data;
  }

  deletePasswords(data:any){
    for(let key of Object.keys(data)){
      if(key.toLowerCase().includes('password')){
        delete data[key];
      }
    }

    return data;
  }

  deleteUnchanged(data:any){
    for(let key of Object.keys(data)){
      if(!data[key]){
        delete data[key];
      }
    }
    return data;
  }

  set shoppingCart(value) {
    console.log(this.shoppingCartValue)
    this.shoppingCartValue.next(value);
    localStorage.setItem('shopping-cart', JSON.stringify(value));
  }
 
  get shoppingCart() {
    return JSON.parse(localStorage.getItem('shopping-cart')) || {items:{}, total:0};
  }

  addItemToShoppingCart(item){
    let newShoppingCart = (this.shoppingCart || {items:{}, total:0});
    newShoppingCart.items[item.isbn] = 1;
    this.shoppingCart = newShoppingCart ;
  }

  removeItemToShoppingCart(item){
    let newShoppingCart = (this.shoppingCart || {items:{}, total:0});
    delete newShoppingCart.items[item.isbn];
    this.shoppingCart = newShoppingCart;
  }

  saveInfo(name:string, info:any){
    localStorage.setItem(name, JSON.stringify(info));
  }

  loadInfo(name:string) :any {
    return JSON.parse(localStorage.getItem(name));
  }

  deleteInfo(name:string){
    localStorage.removeItem(name);
  }

  clearLocaleData(redirectTo:string = 'home') : void {
    localStorage.removeItem('identity');
    if (redirectTo) this._router.navigate([redirectTo]);
    this.openSnackBar({message:'Se ha cerrado session correctamente'});
  }


}
