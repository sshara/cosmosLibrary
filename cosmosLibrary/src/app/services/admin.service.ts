import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { GeneralService } from './system/general.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;
  refoundRef:AngularFireObject<any>;
  refoundsRef:AngularFireList<any>;
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private storage: AngularFireStorage,
    private _generalService:GeneralService
  ) { }

  createBook(data:any){

    let {isbn, front_image, back_image} = data;
    
    delete data.front_image;
    delete data.back_image;

    data.publish_year = data.publish_year.toString();

    this.bookRef = this.firebase.object(`books/${isbn}`);
    let subscriptor = this.bookRef.valueChanges().subscribe(book =>{
      if(book){
        this._generalService.openSnackBar({message:'El libro ya se encuentra registrado.'});
      }else{
        this.bookRef = this.firebase.object(`books/${isbn}`);
        this.bookRef.set(data)
        .then(res => {
          this._generalService.openSnackBar({message:'Se ha añadido el libro satisfactoriamente.'});
          this.uploadFiles({isbn, front_image, back_image});
          this._generalService.goTo('main-admin');
        })
        .catch(err=>{
          this._generalService.openSnackBar({message:'Ocurrió un error al añadir el libro.'});
        });
      }
      subscriptor.unsubscribe();
    })
  }

  uploadFiles(data:any){

    let {isbn, front_image, back_image} = data;

    if(front_image){

      let dateFront = Date.now();
      let fileFrontPath = `books/${dateFront}`;
      let fileFrontRef = this.storage.ref(fileFrontPath);
      

      let frontTask = this.storage.upload(`books/${dateFront}`, front_image);
      frontTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let frontSubscriptor = fileFrontRef.getDownloadURL().subscribe(url => {
              front_image = url;
              this.firebase.object(`books/${isbn}`).update({front_image});
              frontSubscriptor.unsubscribe();
          });
        })
      )
      .toPromise()
      .catch(err => {
        this._generalService.openSnackBar({message:'Ocurrió un error al subir la portada.'});
      })
    }

    if(back_image){

      let dateBack = Date.now(); 
      let fileBackPath = `books/${dateBack}`;
      let fileBackRef = this.storage.ref(fileBackPath);

      let backTask = this.storage.upload(`books/${dateBack}`, back_image);
      backTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let backSubscriptor = fileBackRef.getDownloadURL().subscribe(url => {
              back_image = url;
              this.firebase.object(`books/${isbn}`).update({back_image});
              backSubscriptor.unsubscribe();
          });
        })
      )
      .toPromise()
      .catch(err => {
        this._generalService.openSnackBar({message:'Ocurrió un error al subir la contraportada.'});
      })
    }
  }

  updateBook(data:any){
    let { front_image, back_image} = data;
    
    delete data.front_image;
    delete data.back_image;

    let { isbn } = this._generalService.loadInfo('book');

    data = this._generalService.deleteUnchanged(data);

    data.publish_year = data.publish_year.toString();
    
    this.bookRef = this.firebase.object(`books/${isbn}`);
    this.bookRef.update(data)
    .then(res => {
      this._generalService.openSnackBar({message:'Se ha actualizado el libro satisfactoriamente.'});
      this.uploadFiles({isbn, front_image, back_image});
      this._generalService.goTo('manage-books');
    })
    .catch(err=>{
      this._generalService.openSnackBar({message:'Ocurrió un error al actualizar el libro.'});
    });
      
  }

  getBooks(){
    this.booksRef = this.firebase.list('/books');
    return this.booksRef.valueChanges();
  }

  getBookData(){
    let {isbn } = this._generalService.loadInfo('book');
    this.bookRef = this.firebase.object(`books/${isbn}`);
    return this.bookRef.valueChanges();
  }

  deleteBook(data:any){
    let {isbn} = data;
    this.bookRef = this.firebase.object(`books/${isbn}`);
    this.bookRef.remove()
    .then(ok => {
      this._generalService.openSnackBar({message:'Se ha eliminado el libro satisfactoriamente.'})
    })
    .catch(err=>{
      this._generalService.openSnackBar({message:'Ocurrió un error al eliminar el libro.'})
    })
  }

  getAdminData(){
    let { username } = this._generalService.loadInfo('identity');
    console.log(username);
    this.userRef = this.firebase.object(`users/${username}`);
    return this.userRef.valueChanges();
  }

  updateAdminData(data:any){
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
          this._generalService.goTo('manage-books');
        })
        .catch(err=>{
          this._generalService.openSnackBar({message:'Ocurrió un error al actualizar la cuenta.'});
        });
      }
      subscriptor.unsubscribe();
    })
    
  }

  getSoldout(){
    this.booksRef = this.firebase.list('/books', ref => ref.orderByChild('available_units').equalTo('0'));
    return this.booksRef.valueChanges();
  }

  acceptRefound(type, refound){
    let {username , isbn} = refound;
    this.refoundRef = this.firebase.object(`refounds/${username}-${isbn}`);
    if(type == 1){
      this.refoundRef.update({accepted:true})
      .then(response => {
        this._generalService.openSnackBar({message:'Se ha aceptado la solicitud de reembolso.'});
      })
      .catch(err =>{
        this._generalService.openSnackBar({message:'Ocurrió un error al aceptar la solicitud de reembolso.'});
      })

      this.bookRef = this.firebase.object(`books/${isbn}`);
      this.bookRef.update({available_units:refound.available_units});

      this.userRef = this.firebase.object(`users/${username}`);
      let subscriptor = this.userRef.valueChanges().subscribe(user =>{
        this.userRef.update({coins: parseInt(user.coins)+ parseInt(refound.price)});
        subscriptor.unsubscribe();
      });
      
    }else if (type == 0){
      this.refoundRef.remove()
      .then(response => {
        this._generalService.openSnackBar({message:'Se ha descartado la solicitud de reembolso.'});
      })
      .catch(err =>{
        this._generalService.openSnackBar({message:'Ocurrió un error al descartar la solicitud de reembolso.'});
      })
    }
  }

  getRefounds(){
    this.refoundsRef = this.firebase.list('/refounds', ref => ref.orderByChild('accepted').equalTo(false));
    return this.refoundsRef.valueChanges();
  }
}
