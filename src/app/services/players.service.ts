import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

// export interface Player { name: string; }

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playersCollection: AngularFirestoreCollection;
  players: Observable<Array<any>>;
  
  constructor(
    private afs: AngularFirestore,
    public storage: Storage
  ) {
    this.playersCollection = afs.collection('Players', ref => ref.orderBy('adp', 'asc'));
    this.players = this.playersCollection.valueChanges(
      {idField:"playerID"}
    )
  }

  getAllPlayers():any {
    return this.players;
  }

  getBorderColor(position):string {
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
      return "#21242b"
    }
  }

  getTierColor(tier):string {
    if (tier == 1) {
      return "#fafbfc";
    }
    else if (tier == 2) {
      return "#c4c8d1";
    }
    else if (tier == 3) {
      return "#9399a8";
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
