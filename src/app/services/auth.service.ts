import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { LeagueService } from './league.service';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = null;
  public uid = null;

  public userDoc;
  public userSub;
  public userLeagueID:string;

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public lService: LeagueService,
    public pService: PlayersService,
  ) {
    
    auth.authState.subscribe(user=> {

      console.log('auth state changed', user);

      if (user) {
        this.user = user;
        this.uid = user.uid;
        //subscribe to the user doc where league ID is stored
        this.userDoc = this.afs.doc(`Users/${user.uid}`);
        this.userSub = this.userDoc.valueChanges().subscribe((data)=> {
          console.log(data);
          if (data.leagueID) {
            this.lService.leagueID = data.leagueID;
            this.lService.initLeague();
          }
          else {
            this.lService.createNewLeague(this.storeLeagueID);
          }
        })
      }
      else {
        this.user = null;
        this.uid = null;
        this.lService.setLeagueDefaults();
      }

      this.pService.initPlayers();
      
      // console.log(this.user);
      // console.log(this.uid);
    })
    
  }

  storeLeagueID(leagueID) {
    this.userDoc.update({'leagueID': leagueID});
  }

  getUserLeagueID() {
    return this.userLeagueID;
  }

  displayLoginOptions() {
    
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((userDoc)=> {
      // this.user = userDoc;
      // console.log(this.user);
      // console.log(this.user.additionalUserInfo.profile.given_name);
    })
  }
  logout() {
    this.user = null;
    this.uid = null;
    this.userSub.unsubscribe();
    this.lService.unsubAll();
    this.pService.unsubPlayers();
    this.auth.signOut();
  }

}
