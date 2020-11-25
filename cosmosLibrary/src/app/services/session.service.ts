import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { MailService } from './system/mail.service';
import { GeneralService } from './system/general.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private _mailService: MailService,
    private _generalService:GeneralService
  ) { }

  logIn(username:string){
    this.userRef = this.firebase.object(`users/${username}`);
    return this.userRef.valueChanges();
  }

  signUp(data:any){
    let {username, email} = data;
    this.usersRef = this.firebase.list('/users', ref => ref.orderByChild('email').equalTo(email));
    let subscriptor = this.usersRef.valueChanges().subscribe(users =>{
      let user = users.pop();
      if(user){
        this._generalService.openSnackBar({message:'El correo electrónico ingresado, ya se encuentra registrado.'});
      }else{
        data.role = 'client';
        this.userRef = this.firebase.object(`users/${username}`);
        return this.userRef.set(user);
      }
      subscriptor.unsubscribe();
    })

    
  }

  recoverPassword(data:any){
    data.code = 'a7huJlz4mW';
    let {email,code} = data;
    this.usersRef = this.firebase.list('/users', ref => ref.orderByChild('email').equalTo(email));
    let subscriptor = this.usersRef.valueChanges().subscribe(users =>{
      let user = users.pop();
      if(user){
        let { username } = user;
        this.firebase.object(`users/${username}`).update({password:code});
        this._mailService.sendEmail({...data, ...user});
      }else{
        this._generalService.openSnackBar({message:'El correo electrónico ingresado, no pertenece a ninguna cuenta.'})
      }
      subscriptor.unsubscribe();
    })
    
  }
}
