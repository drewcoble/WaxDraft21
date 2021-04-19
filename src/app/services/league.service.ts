import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { League } from '../interfaces/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  public leagueDoc: AngularFirestoreDocument;
  public league: Observable<League>;
  public leagueSettings = {
    'positions': {},
  }

  //wax museum league id for testing
  leagueID = "llDbnhbfhSiKqOjsN6jl";

  constructor(
    private afs: AngularFirestore
  ) {
    this.leagueDoc = afs.doc(`Leagues/${this.leagueID}`);
    this.league = this.leagueDoc.valueChanges();
   }

   getLeague():any {
    return this.league;
   }
}
