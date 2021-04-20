import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { League } from '../interfaces/league';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  //league variables
  public leagueDoc: AngularFirestoreDocument;
  public league: Observable<League>;
  public leagueSettings = {
    'positions': {},
    'rounds': 15,
  }

  //storing things to track the draft
  public currentPick:number;
  public draftedPlayers = [];

  //teams variables
  // public teams: Array<Team>;
  private teamsCollection: AngularFirestoreCollection;
  private teamsObservable: Observable<Array<Team>>;
  public teams: any;

  //wax museum league id for testing
  leagueID = "llDbnhbfhSiKqOjsN6jl";

  constructor(
    private afs: AngularFirestore,
  ) {
    //league document observer
    this.leagueDoc = afs.doc(`Leagues/${this.leagueID}`);
    this.league = this.leagueDoc.valueChanges(
      {idField:'leagueID'}
    );

    //teams collection observer
    this.teamsCollection = afs.collection<Team>(`Leagues/${this.leagueID}/teams`, ref => ref.orderBy('pick', 'asc'));

    this.teams = this.teamsCollection.valueChanges({idField:'teamID'});
   }

   getLeague():any {
    return this.league;
   }

   getTeams():any {
    return this.teams;
  }

  draftPlayer(playerID):void {
    this.draftedPlayers.push(playerID);
    this.currentPick ++;
  }
}
