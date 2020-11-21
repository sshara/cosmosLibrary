import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  login(data:any){
    let {username} = data;
    return this.firestore.collection('users').doc(username).snapshotChanges();
  }
}
