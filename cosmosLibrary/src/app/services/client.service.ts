import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { MailService } from './system/mail.service';
import { GeneralService } from './system/general.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;

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
}
