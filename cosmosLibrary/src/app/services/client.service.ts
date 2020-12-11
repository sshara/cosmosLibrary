import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { MailService } from './system/mail.service';
import { GeneralService } from './system/general.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  refoundRef:AngularFireObject<any>;
  refoundsRef:AngularFireList<any>;
  shoppingRef:AngularFireObject<any>;
  shoppingsRef:AngularFireList<any>;
  bookingRef:AngularFireObject<any>;
  bookingsRef:AngularFireList<any>;
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private _mailService: MailService,
    private _generalService:GeneralService
  ) { }

  getProfileData(){
    let { username } = this._generalService.loadInfo('identity');
    console.log(username);
    this.userRef = this.firebase.object(`users/${username}`);
    return this.userRef.valueChanges();
  }

  updateProfileData(data:any){
    let { username } = this._generalService.loadInfo('identity');
    data.birthdate = data.birthdate.toString();

    data = this._generalService.deleteUnchanged(data);
    
    if(data.password !== data.confirmationPassword || !data.password || !data.confirmationPassword){
      data = this._generalService.deletePasswords(data);
    }
    let subscriptor = this.firebase.object(`users/${username}`).valueChanges().subscribe((user:any) => {
      if(user.password !== data.oldPassword && data.oldPassword){
        this._generalService.openSnackBar({message:'Contraseña erronea.'});
      }else{
        this.userRef = this.firebase.object(`users/${username}`);
        this.userRef.update(data)
        .then(update => {
          this._generalService.openSnackBar({message:'Se ha actualizado la cuenta satisfactoriamente.'});
          this._generalService.goTo('home-client');
        })
        .catch(err=>{
          this._generalService.openSnackBar({message:'Ocurrió un error al actualizar la cuenta.'});
        });
      }
      subscriptor.unsubscribe();
    })
    
    
  }

  getSuggestedBooks(){
    let { topic } = this._generalService.loadInfo('identity');
    this.booksRef = this.firebase.list('/books', ref => ref.orderByChild('topic').equalTo(topic));
    return this.booksRef.valueChanges();
  }

  getNews(){
    this.booksRef = this.firebase.list('/books', ref => ref.orderByChild('on_news').equalTo(true));
    return this.booksRef.valueChanges();
  }

  requestRefound(item, message){
    let { username } = this._generalService.loadInfo('identity');
    let { isbn } = item;
    this.refoundRef = this.firebase.object(`refounds/${username}-${isbn}`);
    let subcription = this.refoundRef.valueChanges().subscribe(refound=>{
      if(refound){
        this._generalService.openSnackBar({message:'Ya ha solicitado un reembolso por este libro previamente.'});
      }else{
        let data = item;
        data.accepted = false;
        data.message = message;
        this.refoundRef.set(data);
        this._generalService.openSnackBar({message:'Se ha hecho la solicitud de reembolso.'});
      }
      subcription.unsubscribe();
    })
  }

  buyItems(items, total){
    let { username, coins } = this._generalService.loadInfo('identity');
    this.shoppingsRef = this.firebase.list(`users/${username}/shoppings`);
    items.forEach(item => {
      let data = item;
      data.refounded = false;
      this.shoppingsRef.set(data.isbn, data)
      .then(response =>{
        this._generalService.clearShoppingCart();
        this._generalService.openSnackBar({message:'Se ha realizado la compra satisfactoriamente.'});
      })
      .catch(err => {
        this._generalService.openSnackBar({message:'Ha ocurrido un error al realizar la compra.'});
      })
      this.bookRef = this.firebase.object(`books/${data.isbn}`); 
      let left = parseInt(data.available_units)-parseInt(data.amount);
      if(left < 0) left = 0
      this.bookRef.update({available_units:left});

      this.userRef = this.firebase.object(`users/${username}`); 
      let leftCoins = parseInt(coins)-parseInt(total);
      if(leftCoins < 0) leftCoins = 0
      this.userRef.update({coins:leftCoins});
    });
  }

  booking(book){
    let { username } = this._generalService.loadInfo('identity');
    this.bookingsRef = this.firebase.list(`users/${username}/bookings`);
    let data = book;
    data.claimed = false;
    let reference = this.bookingsRef;
    let generalServ = this._generalService;
    this.bookingsRef.set(book.isbn, data)
    .then(response =>{
      this._generalService.openSnackBar({message:'Se ha realizado la reserva satisfactoriamente, recuerda que tienes un tiempo límite para comprarlo.'});
      setInterval(function(){
        reference.remove(book.isbn);
        generalServ.openSnackBar({message:`El plazo máximo para comprar el libro ${book.title}, se ha acabado.`});
      }, this._generalService.timeOutBooking);
    })
    .catch(err => {
      this._generalService.openSnackBar({message:'Ha ocurrido un error al realizar la reserva.'});
    })
    this.bookRef = this.firebase.object(`books/${data.isbn}`);
    let left = parseInt(data.available_units)-1;
    if(left < 0) left = 0
    this.bookRef.update({available_units:left});
  }

  getItems(){
    let books:any[] = [];
    let items  = Object.keys(this._generalService.shoppingCart.items);
    for (const item of items) {
      this.bookRef = this.firebase.object(`/books/${item}`);
      books.push(this.bookRef.valueChanges());
    }
    return books;
  }

  buyTokens(amount){
    let { username, coins } = this._generalService.loadInfo('identity');
    this.userRef = this.firebase.object(`users/${username}`);
    this.userRef.update({coins:(parseInt(coins) || 0) + parseInt(amount)})
    .then(response=>{
      this._generalService.openSnackBar({message:'Se ha realizado la compra satisfactoriamente.'});
    })
    .catch(err=>{
      this._generalService.openSnackBar({message:'Hubo un problema al realizar la transacción.'});
    })
  }

  getShopping(){
    let { username } = this._generalService.loadInfo('identity');
    this.booksRef = this.firebase.list(`users/${username}/shoppings`);
    return this.booksRef.valueChanges();
  }

  getbookings(){
    let { username } = this._generalService.loadInfo('identity');
    this.booksRef = this.firebase.list(`users/${username}/bookings`);
    return this.booksRef.valueChanges();
  }
}
