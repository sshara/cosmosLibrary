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
    console.log(data);
    data.birthdate = data.birthdate.toString();
    data.coins = 20;
    let {username, email} = data;
    this.usersRef = this.firebase.list('/users', ref => ref.orderByChild('email').equalTo(email));
    let subscriptor1 = this.usersRef.valueChanges().subscribe(users =>{
      let user = users.pop();
      if(user){
        this._generalService.openSnackBar({message:'El correo electrónico ingresado, ya se encuentra registrado.'});
      }else{
        this.usersRef = this.firebase.list('/users', ref => ref.orderByChild('username').equalTo(username));
        let subscriptor2 = this.usersRef.valueChanges().subscribe(users =>{
          let user = users.pop();
          if(user){
            this._generalService.openSnackBar({message:'El nombre de usuario ingresado, ya se encuentra registrado.'});
          }else{
            data.role = 'client';
            this.userRef = this.firebase.object(`users/${username}`);
            this.userRef.set(data)
            .then(res => {
              this._generalService.openSnackBar({message:'Se ha creado la cuenta satisfactoriamente.'});
              this._generalService.goTo('login');
            })
            .catch(err=>{
              this._generalService.openSnackBar({message:'Ocurrió un error al crear la cuenta.'});
            });
          }
          subscriptor2.unsubscribe();
        });
      }
      subscriptor1.unsubscribe();
    })

    
  }

  recoverPassword(data:any){
    data.code = this._generalService.randomString(24, 'Aa#!');
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
