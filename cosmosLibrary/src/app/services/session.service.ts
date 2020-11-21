import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  login(username:string){
    this.userRef = this.firebase.object(`users/${username}`);
    return this.userRef.valueChanges();
  }
}
