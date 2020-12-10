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
        data.enabled = true;
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

  getAdmins(){
    this.usersRef = this.firebase.list('users', ref => ref.orderByChild('role').equalTo('admin'));
    return this.usersRef.valueChanges();
  }

  updateStatusAdmin(admin:any){
    this.userRef = this.firebase.object(`users/${admin.username}`);
    this.userRef.update(admin)
    .then(response =>{
      this._generalService.openSnackBar({message:'Se ha actualizado correctamente el estado del usuario.'});
    })
    .catch(err => {
      this._generalService.openSnackBar({message:'Ha ocurrido un error al actualizar el estado.'});
    })
  }
}
