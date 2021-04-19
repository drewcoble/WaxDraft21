import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LeagueService } from './league.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teamsCollection: AngularFirestoreCollection;
  teams: Observable<Array<any>>;

  //wax museum league id for testing
  leagueID = "llDbnhbfhSiKqOjsN6jl";

  constructor(
    private afs: AngularFirestore,
    public lService: LeagueService
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

  resetDraft():void {
    this.teams.forEach((doc)=>{
      doc.forEach((team)=>{
        let teamPicks = [];
        
        for(let i=0; i<15; i++) {
          teamPicks[i] = {
            'player': {},
            'team': team.teamID
          }; 
        }
        let thisTeamDoc = this.afs.doc(`Leagues/${this.leagueID}/teams/${team.teamID}`);
        thisTeamDoc.update({
          'picks': teamPicks,
        });
      })
    })
  }

  draftPlayer(playerID, teamID) {
    //get a player object from playersService

    //send the player object to the correct team (stored here)
      //handle logic to find correct spot on team roster, etc.
  }

  
}
