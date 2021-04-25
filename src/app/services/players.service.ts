import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
// import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';

import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playersCollection: AngularFirestoreCollection;
  private playersSubscription;
  public players: Player[];

  public sortField = 'adp';
  
  constructor(
    private afs: AngularFirestore,
    public storage: Storage
  ) {
    this.initPlayers();
  }

  initPlayers() {
    this.playersCollection = this.afs.collection('Players', ref => ref.orderBy('adp', 'asc'));

    /****** OBSERVING PLAYERS COLLECTION REFERENCE ******/

    this.playersSubscription = this.playersCollection.valueChanges(
      {idField:"playerID"}
    ).subscribe((data)=>{
      this.players = data;
    })
    /****************************************************/
  }

  unsubPlayers() {
    this.playersSubscription.unsubscribe();
  }

  resortPlayersData():void {
    let sortDir;

    //set the new sort field and sort direction
    if (this.sortField == 'adp') {
      this.sortField = 'tier';
      sortDir = 'asc';
    }
    else if (this.sortField == 'tier') {
      this.sortField = 'ppg20';
      sortDir = 'desc';
    }
    else if (this.sortField == 'ppg20') {
      this.sortField = 'ppg21';
      sortDir = 'desc';
    }
    else if (this.sortField == 'ppg21') {
      this.sortField = 'adp';
      sortDir = 'asc';
    }

    // unsubscribe to previous players subscription
    this.playersSubscription.unsubscribe();
    //get a new reference with the new sort value & sort direction
    this.playersCollection = this.afs.collection('Players', ref => ref.orderBy(this.sortField, sortDir));
    // subscribe to the new players reference
    this.playersCollection.valueChanges(
      {idField:"playerID"}
    ).subscribe((data)=>{
      this.players = data;
    })
  }

  getAllPlayers():any {
    return this.players;
  }

  getPositionColor(position):string {
    if (position == "QB") {
      return "#ff4141";
    }
    else if (position == "RB" || position == "RB1" || position == "RB2") {
      return "#13d146";
    }
    else if (position == "WR") {
      return "#087aff";
    }
    else if (position == "TE") {
      return "#ffb100";
    }
    else if (position == "DEF") {
      return "#8030dd";
    }
    else if (position == "K") {
      return "#a5a5a5";
    }
    else if (position == 'active') {
      return "#e8e8e8"
    }
    else {
      return "#212424"
    }
  }


  getTierColor(tier):string {
    if (tier == 1) {
      return "#fdfeff";
    }
    else if (tier == 2) {
      return "#c4c9d2";
    }
    else if (tier == 3) {
      return "#9399a9";
    }
    else if (tier == 4) {
      return "#636b7e";
    }
    else if (tier == 5) {
      return "#444a5a";
    }
    else if (tier == 6) {
      return "#242832";
    }
    else if (tier == 7) {
      return "#090a0d";
    }
    else {
      return "";
    }
  } 
  
}
