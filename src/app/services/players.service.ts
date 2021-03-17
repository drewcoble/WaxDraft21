import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// export interface Player { name: string; }

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  // private baseUrl = 'https://api.nfl.com/v1/';
  // playersUrl = 'persons/32004d41-4371-0352-e57d-251eacb121bd?fs={playerStats{teamStats{passing}}}';  // URL to web api

  private playersCollection: AngularFirestoreCollection;
  players: Observable<Array<any>>;
  
  constructor(
    // private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.playersCollection = afs.collection('Players', ref => ref.orderBy('adp', 'asc'));
    this.players = this.playersCollection.valueChanges(
      {idField:"playerID"}
    );
    // console.log(this.players);
    // this.players.forEach((doc)=> {
      // console.log(doc);
    // })
  }

  getAllPlayers():any {
    return this.players;
  }

  getBorderColor(position):string {
    if (position == "QB") {
      return "#ff4141";
    }
    else if (position == "RB") {
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
      return "#e8e8e8";
    }
    else {
      return "#696969"
    }
  }
  

  // makeTestCall():any {
  //   let url = this.baseUrl + this.playersUrl;
  //   console.log(url);

  //   return this.http.get(url)
  //     .pipe(
  //     );
  // }
}
