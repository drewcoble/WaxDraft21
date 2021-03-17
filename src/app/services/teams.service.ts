import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teamsCollection: AngularFirestoreCollection;
  teams: Observable<Array<any>>;

  //wax museum league id for testing
  leagueID = "llDbnhbfhSiKqOjsN6jl";

  constructor(
    private afs: AngularFirestore
  ) {
    this.teamsCollection = afs.collection(`Leagues/${this.leagueID}/teams`, ref => ref.orderBy('pick', 'asc'));
    this.teams = this.teamsCollection.valueChanges(
      {idField:'teamID'}
    );
    // console.log(this.players);
    // this.players.forEach((doc)=> {
      // console.log(doc);
    // })
  }

  getTeams():any {
    return this.teams;
  }

  
}
