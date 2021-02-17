import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ConsoleReporter } from 'jasmine';
import { Observable } from 'rxjs';

export interface Player { name: string; }

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  // private baseUrl = 'https://api.nfl.com/v1/';
  // playersUrl = 'persons/32004d41-4371-0352-e57d-251eacb121bd?fs={playerStats{teamStats{passing}}}';  // URL to web api

  private playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;
  
  constructor(
    // private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.playersCollection = afs.collection<Player>('Players');
    this.players = this.playersCollection.valueChanges();
    this.players.forEach((doc)=> {
      console.log(doc);
    })
  }

  getAllPlayers():any {
    return this.players;
  }
  

  // makeTestCall():any {
  //   let url = this.baseUrl + this.playersUrl;
  //   console.log(url);

  //   return this.http.get(url)
  //     .pipe(
  //     );
  // }
}
