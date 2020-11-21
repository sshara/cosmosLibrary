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

  logIn(username:string){
    this.userRef = this.firebase.object(`users/${username}`);
    return this.userRef.valueChanges();
  }

  signUp(user:any){
    let {username} = user;
    user.role = 'client';
    this.userRef = this.firebase.object(`users/${username}`);
    return this.userRef.set(user);
  }
}
