import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { GeneralService } from './system/general.service';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private _generalService:GeneralService
  ) { }

  createUserAdmin(data:any){
    let {username} = data;
    this.userRef = this.firebase.object(`users/${username}`);
    let subscriptor = this.userRef.valueChanges().subscribe(user =>{
      if(user){
        this._generalService.openSnackBar({message:'El nombre de usuario ingresado, ya se encuentra registrado.'});
      }else{
        data.role = 'admin';
        this.userRef = this.firebase.object(`users/${username}`);
        this.userRef.set(data)
        .then(res => {
          this._generalService.openSnackBar({message:'Se ha creado la cuenta satisfactoriamente.'});
        })
        .catch(err=>{
          this._generalService.openSnackBar({message:'Ocurrió un error al crear la cuenta.'});
        });
      }
      subscriptor.unsubscribe();
    })
  }
}
