import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeneralSnackBarComponent } from 'src/app/components/system/general-snack-bar/general-snack-bar.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  shoppingCartValue = new BehaviorSubject(this.shoppingCart);
  timeOutBooking = 5*60*1000;
  dataUserSubscription:Subscription;
  userRef: AngularFireObject<any>;
  //cart =  {items:{isbn:amount}, total:number } 
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _http: HttpClient,
    private firebase: AngularFireDatabase,
    ) { 
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

  randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
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
    this.shoppingCartValue.next(value);
    localStorage.setItem('shopping-cart', JSON.stringify(value));
  }
 
  get shoppingCart() {
    return JSON.parse(localStorage.getItem('shopping-cart')) || {items:{}, total:0};
  }

  addItemToShoppingCart(item){
    let newShoppingCart = (this.shoppingCart || {items:{}, total:0});
    if (Object.keys(newShoppingCart.items).length <= 5) newShoppingCart.items[item.isbn] = {amount:1, price: parseInt(item.price), total:parseInt(item.price)};
    newShoppingCart.total += parseInt(item.price);
    this.shoppingCart = newShoppingCart;
  }

  removeItemToShoppingCart(item){
    let newShoppingCart = (this.shoppingCart || {items:{}, total:0});
    delete newShoppingCart.items[item.isbn];
    newShoppingCart.total -= parseInt(item.price) * parseInt(item.amount);
    if(Object.keys(newShoppingCart.items).length === 0) newShoppingCart.total = 0;
    this.shoppingCart = newShoppingCart;
  }

  updateItemQuantityShoppingCart(item, quantity){
    let newShoppingCart = this.shoppingCart;
    newShoppingCart.items[item.isbn].amount += quantity;
    if (newShoppingCart.items[item.isbn].amount > 3) {
      newShoppingCart.items[item.isbn].amount = 3;
      quantity = 0;
    }
    if (newShoppingCart.items[item.isbn].amount < 1){
      newShoppingCart.items[item.isbn].amount = 1;
      quantity = 0;
    } 

    newShoppingCart.items[item.isbn].total = newShoppingCart.items[item.isbn].amount * newShoppingCart.items[item.isbn].price;
    newShoppingCart.total += quantity * newShoppingCart.items[item.isbn].price;
    this.shoppingCart = newShoppingCart;

    return newShoppingCart.items[item.isbn];
  }

  saveInfo(name:string, info:any){
    if(name == 'identity' && (!this.dataUserSubscription || this.dataUserSubscription.closed) ){
      this.userRef = this.firebase.object(`users/${info.username}`);
      this.dataUserSubscription = this.userRef.valueChanges().subscribe(user => {
        let identity = {username:user.username, role:user.role, topic:user.topic, coins:user.coins};
        this.saveInfo('identity', identity);
      })
    }
    localStorage.setItem(name, JSON.stringify(info));
  }

  loadInfo(name:string) :any {
    return JSON.parse(localStorage.getItem(name));
  }

  deleteInfo(name:string){
    localStorage.removeItem(name);
  }

  dateYearsBefore(years:number, date:Date){
    let currentDate = new Date();
    currentDate.setFullYear(2020-years);
    return this.compareDates(currentDate, date);
  }

  compareDates(current:Date, selected:Date){
    if(current.getFullYear() < selected.getFullYear()) return false;
    else if(current.getFullYear() == selected.getFullYear()){
      if(current.getMonth() < selected.getMonth()) return false;
      else if(current.getMonth() == selected.getMonth()){
        if(current.getDay() < selected.getDay()) return false;
      }
    }
    return true;
  }

  clearShoppingCart(redirectTo:string = 'home'){
    this.shoppingCart = {items:{}, total:0};
    if (redirectTo) this._router.navigate([redirectTo]);
  }

  clearLocaleData(redirectTo:string = 'home') : void {
    localStorage.removeItem('identity');
    this.dataUserSubscription.unsubscribe();
    if (redirectTo) this._router.navigate([redirectTo]);
    this.openSnackBar({message:'Se ha cerrado session correctamente'});
  }


}
