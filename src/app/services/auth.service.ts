import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user;

  constructor(public auth: AngularFireAuth) {
    auth.authState.subscribe(user=> {
      this.user = user;
      console.log(this.user);
    })
  }

  login():void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout():void {
    this.auth.signOut();
  }

}
