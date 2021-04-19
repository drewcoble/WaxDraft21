import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user;
  public uid;

  constructor(public auth: AngularFireAuth) {
    auth.authState.subscribe(user=> {
      this.user = user;
      this.uid = user.uid;
      // console.log(this.user);
      // console.log(this.uid);
    })
  }

  displayLoginOptions() {
    
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((userDoc)=> {
      this.user = userDoc;
      console.log(this.user);
      console.log(this.user.additionalUserInfo.profile.given_name);
    })
  }
  logout() {
    this.auth.signOut();
  }

}
