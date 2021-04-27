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

  public userCollection: AngularFirestoreCollection;
  public userDoc: AngularFirestoreDocument;
  public userSub;
  public userLeagueID:string;

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public lService: LeagueService,
    public pService: PlayersService,
  ) {
    this.userCollection = afs.collection('Users');

    auth.authState.subscribe(user=> {

      console.log('auth state changed', user);

      if (user) {

        this.user = user;
        this.uid = user.uid;

        //subscribe to the user doc where league ID is stored
        this.userDoc = this.userCollection.doc(user.uid);
        // console.log(this.userDoc);
        // if there's a userDoc, subscribe to it.
        if (this.userDoc) {
          this.userSub = this.userDoc.valueChanges().subscribe((data)=> {
            console.log(data);
            if (data) {
              this.lService.leagueID = data.leagueID;
              this.lService.initLeague();
            }
            else {
              this.pService.unsubPlayers();
              // this.lService.unsubAll();
              this.lService.setLeagueDefaults();
              let newLeagueID = this.afs.createId();
              this.lService.leagueID = newLeagueID;
              // this.userSub.unsubscribe();
              this.userCollection.doc(user.uid).set({'leagueID': newLeagueID});
              this.lService.createNewLeague();

              this.lService.initLeague();
              // this.lService.resetFirestoreDraftPicks();
              // this.lService.resetFirestoreRosters();
              this.pService.initPlayers();
            }
          })
        }
      }
      else {
        this.user = null;
        this.uid = null;
        this.lService.leagueID = '';
        this.lService.setLeagueDefaults();
      }

      this.pService.initPlayers();
      
      // console.log(this.user);
      // console.log(this.uid);
    })
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
    this.lService.leagueID = "";
    this.userSub.unsubscribe();
    this.lService.unsubAll();
    this.pService.unsubPlayers();
    this.auth.signOut();
  }

}
