import { Injectable } from '@angular/core';

// import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PopoverController } from '@ionic/angular';
// import { Observable } from 'rxjs';
// import { AppComponent } from '../app.component';
import { League } from '../interfaces/league';
import { Team } from '../interfaces/team';
// import { AuthService } from './auth.service';
import { PlayersService } from './players.service';
// import { Storage } from '@ionic/storage';
import { NEW_TEAMS } from '../../assets/data/newTeams'


@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  //league variables
  public leagueDoc: AngularFirestoreDocument;
  // set empty league as default template
  public league: League;
  private leagueSub;
  // public leagueSettings = {
  //   'positions': {},
  //   'rounds': 15,
  // }

  //storing things to track the draft
  // public currentPick:number;
  // public currentRound:number;
  public draftedPlayers: string[] = [];

  //teams variables
  // public teams: Array<Team>;
  public teamsCollection: AngularFirestoreCollection;
  public teamsSubscription;
  // set empty teams as default template
  public teams: Team[];

  //wax museum league id for testing
  // leagueID:string = "llDbnhbfhSiKqOjsN6jl";
  // myTeamID:string = "AyFiP7mYPsxaBwUcEkOX";

  leagueID:string;
  // myTeamID:string;

  constructor(
    private afs: AngularFirestore,
    public popoverController: PopoverController,
    public pService: PlayersService,
  ) {
 
  }

  initLeague():void {
    console.log('inside initLeague');
    //league document observer
    this.leagueDoc = this.afs.doc(`Leagues/${this.leagueID}`);
    this.leagueSub = this.leagueDoc.valueChanges(
      {idField:'leagueID'}
    ).subscribe((data)=>{
      // console.log(data);
      this.league = data;
      this.draftedPlayers = data.draftedPlayers;
    });
        
    //create a new league in firestore
    // this.createNewLeague();
    // MAKE FIRST TEAM 'MY TEAM'

    //save leagueID of new league
    //save myTeamID of first team

    //teams collection observer
    this.teamsCollection = this.afs.collection<Team>(`Leagues/${this.leagueID}/teams`, ref => ref.orderBy('pick', 'asc'));

    this.teamsSubscription = this.teamsCollection.valueChanges({idField:'teamID'}).subscribe((data)=>{
      this.teams = data;
      // this.league.myTeamID = data[0].teamID;
    });

  }
  // END of initLeague function

  setLeagueDefaults() {
    console.log('setting league defaults');
    this.league = {
      currentPick: 1,
      currentRound: 1,
      draftedPlayers: [],
      leagueID: 'no-league',
      name: 'no-league-name',
      myTeamID: 'newTeam1',
      numRounds: 15,
      numTeams: 12,
      positions: {
        B: 6,
        DEF: 1,
        K: 1,
        QB: 1,
        QRWT: 0,
        RB: 2,
        RWT: 1,
        TE: 1,
        WR: 2,
      }
    };

    this.teams = NEW_TEAMS;

    this.draftedPlayers = [];

    // if (this.teamsSubscription) {
    //   this.teamsSubscription.unsubscribe();
    // }
    // if (this.leagueSub) {
    //   this.leagueSub.unsubscribe();
    // }
  }

  unsubAll() {
    this.leagueSub.unsubscribe();
    this.teamsSubscription.unsubscribe();
    this.teamsCollection = null;
    this.leagueDoc = null;
  }

  getLeague():any {
  return this.league;
  }

  getTeams():any {
    return this.teams;
  }

  updateTeams() {
    this.teamsSubscription.unsubscribe();
    // console.log(newTeams);

    this.teams.forEach(team => {
      // console.log(team);
      this.teamsCollection.doc(team.teamID).update({'pick':team.pick, 'manager':team.manager, 'name':team.name});
    });

    //resub to teams collection
    this.teamsSubscription = this.teamsCollection.valueChanges({idField:'teamID'}).subscribe((data)=>{
      this.teams = data;
      // this.league.myTeamID = data[0].teamID;
    });
  }

  getLeagueSettings():any {
    let settingsObj = {
      name: this.league.name,
      numRounds: this.league.numRounds,
      numTeams: this.league.numTeams,
      positions: this.league.positions,
    };

    return settingsObj;
  }

  updateLeagueSettings(settingsObj):void {
    
  }

  addPlayerToRoster(player, dpTeam, rtIndex):boolean {
    console.log('add player to roster: ' + player.playerID);
    //get the ID of the team who is rostering this draft pick (is possibly different than the team that is holding the draft pick -- if the pick was traded)
    let rosterTeam = dpTeam.picks[this.league.currentRound - 1].team;
    console.log(rosterTeam.teamID);

    let playerAdded:boolean = false;
    let rSpots = ['QB','RB','WR','TE','DEF','K'];
    // loop thru the rSpots array
    for (let i = 0; i < rSpots.length; i++) {
      //check the player's position first
      
      for (let p = 0; p < this.league.positions[player.position]; p++) {
        if (!playerAdded && !this.teams[rtIndex].roster[player.position][p].playerID) {
          this.teams[rtIndex].roster[player.position][p] = player;
          playerAdded = true;
        }
      }
      
      // next, check for flex eligibilty
      if (this.league.positions.RWT > 0 &&
      !playerAdded && (
      player.position == "RB" || 
      player.position == "WR" || 
      player.position == "TE")) {
        for (let f = 0; f < this.league.positions.RWT; f++) {
          if (!playerAdded && !this.teams[rtIndex].roster['RWT'][f].playerID) {
            this.teams[rtIndex].roster['RWT'][f] = player;
            playerAdded = true;
          }
        }
      } // next, check for super-flex eligibilty
      if (this.league.positions.QRWT > 0 &&
      !playerAdded && (
      player.position == "QB" ||
      player.position == "RB" || 
      player.position == "WR" || 
      player.position == "TE")) {
        for (let sf = 0; sf < this.league.positions.QRWT; sf++) {
          if (!playerAdded && !this.teams[rtIndex].roster['QRWT'][sf].playerID) {
            this.teams[rtIndex].roster['QRWT'][sf] = player;
            playerAdded = true;
          }
        }
      } // next, add player to bench if a slot is open
      if (!playerAdded) {
        for (let b = 0; b < this.league.positions.B; b++) {
          if (!playerAdded && !this.teams[rtIndex].roster['B'][b].playerID) {
            this.teams[rtIndex].roster['B'][b] = player;
            playerAdded = true;
          }
        }
      }
      
      //if player finds a spot, update firestore
      if (playerAdded) {
        if (this.teamsCollection) {
          this.teamsCollection.doc(rosterTeam.teamID).update({'roster': this.teams[rtIndex].roster});
        }
        return true;
      }
      //if player is not added, do not draft him
      else {
        return false;
      }
    }

    // this.getRosterPosition(player, rosterTeam);
    // console.log(this.draftedPlayers);
    
  }

  // getRosterPosition(player, rosterTeam):boolean {
  //   let playerAdded:boolean = false;
  //   let rSpots = ['QB','RB','WR','TE','DEF','K'];
  //   // loop thru the rSpots array
  //   for (let i = 0; i < rSpots.length; i++) {
  //     // if the player's position matches the rSpot...
  //     if (player.position == rSpots[i]) {
  //       // loop through the team's roster of this rSpot
  //       for (let p = 0; p < this.league.positions[rSpots[i]].length; p++) {
  //         // if the rSpot on the roster is not occupied by a player already...
  //         if (!rosterTeam.roster[rSpots[i][p]].playerID && !playerAdded) {
  //           // add this player to this rSpot
  //           rosterTeam.roster[rSpots[i][p]] = player;
  //           playerAdded = true;
  //           // break the inner for loop
  //           break;
  //         }
  //       }
  //     } // next, check for flex eligibilty
  //     else if (this.league.positions.RWT > 0 &&
  //     !playerAdded && (
  //     player.position == "RB" || 
  //     player.position == "WR" || 
  //     player.position == "TE")) {
  //       for (let f = 0; f < this.league.positions.RWT; f++) {
  //         if (!rosterTeam.roster['RWT'][f].playerID) {
  //           rosterTeam.roster['RWT'][f] = player;
  //           playerAdded = true;
  //           break;
  //         }
  //       }
  //     } // next, check for super-flex eligibilty
  //     else if (this.league.positions.QRWT > 0 &&
  //     !playerAdded && (
  //     player.position == "QB" ||
  //     player.position == "RB" || 
  //     player.position == "WR" || 
  //     player.position == "TE")) {
  //       for (let sf = 0; sf < this.league.positions.QRWT; sf++) {
  //         if (!rosterTeam.roster['QRWT'][sf].playerID) {
  //           rosterTeam.roster['QRWT'][sf] = player;
  //           playerAdded = true;
  //           break;
  //         }
  //       }
  //     } // next, add player to bench if a slot is open
  //     else {
  //       for (let b = 0; b < this.league.positions.B; b++) {
  //         if (!rosterTeam.roster['B'][b].playerID) {
  //           rosterTeam.roster['B'][b] = player;
  //           playerAdded = true;
  //           break;
  //         }
  //       }
  //     }
  //     //after all this, if player is still not added, do not draft him.
  //     if (!playerAdded) {
  //       return false;
  //     }
  //     else {
  //       return true;
  //     }
  //   }
  // }

  nextPick() {
    if (this.league.currentPick == this.league.numTeams) {
      this.league.currentPick = 1;
      this.league.currentRound ++;
    }
    else {
      this.league.currentPick ++;
    }
  }

  draftPlayer(player, callback):void {

    // get the team (storing the draft pick) based on round
    let draftPickTeam:any;
    let draftPickTeamIndex:number = 0;
    let rosterTeamIndex:number;

    if (this.league.currentRound % 2 == 1) {
      draftPickTeam = this.teams[this.league.currentPick - 1];
      draftPickTeamIndex = this.league.currentPick -1;
    }
    else {
      draftPickTeam = this.teams[this.league.numTeams - this.league.currentPick];
      draftPickTeamIndex = this.league.numTeams - this.league.currentPick;
    }
    this.teams.forEach((team, idx) => {
      if (draftPickTeam.picks[this.league.currentRound - 1].team.teamID == team.teamID) {
        rosterTeamIndex = idx;
      }
    })


    // add the drafted player to the CORRECT team
    let draftPlayer = this.addPlayerToRoster(player, draftPickTeam, rosterTeamIndex);

    // if the player finds a roster spot on the team, continue with the drafting process
    if (draftPlayer) {
      // add player id to draftedPlayers
      this.draftedPlayers.push(player.playerID);
      // set the new draftedPlayers in local storage
      // this.storage.set('WAX_draftedPlayers', this.draftedPlayers);
      // set the new draftedPlayers in firestore
      if (this.leagueDoc) {
        this.leagueDoc.update({'draftedPlayers': this.draftedPlayers});
      }
      // console.log(this.teams[0]);
      

      // create a new picks array for the current drafting team
      let newPicksArray = this.teams[draftPickTeamIndex].picks;
      // if (this.league.currentRound % 2 == 1) {
      //   newPicksArray = this.teams[this.league.currentPick - 1].picks;
      // }
      // else {
      //   newPicksArray = this.teams[12 - this.league.currentPick].picks;
      // }
      //add the player to the new array
      newPicksArray[this.league.currentRound - 1].player = player;

      // add the drafted player to the draft spot
      //if it is an odd round
      if (this.teamsCollection) {

        this.teamsCollection.doc(draftPickTeam.teamID).update({'picks': newPicksArray});


        // if (this.league.currentRound % 2 == 1) {
        //   this.teamsCollection.doc(this.teams[this.league.currentPick - 1].teamID).update({'picks': newPicksArray});
        // }

        // //if it is an even round
        // if (this.league.currentRound % 2 == 0) {
        //   this.teamsCollection.doc(this.teams[12 - this.league.currentPick].teamID).update({'picks': newPicksArray});
        // }
      }
      
      
      

      // change the active pick
      this.nextPick();
      // update both in firestore
      if (this.leagueDoc) {
        this.leagueDoc.update({ 'currentRound': this.league.currentRound });
        this.leagueDoc.update({ 'currentPick': this.league.currentPick });
      }
      // update both in local storage
      // this.storage.set('WAX_currentRound', this.currentRound);
      // this.storage.set('WAX_currentPick', this.currentPick);



      // this.setActivePick();
      // this.pService.changePlayerFlag(player);
      this.popoverController.dismiss();
      // refresh the DOM with callback function
      callback();
    }
  }

  createNewLeague() {
    // create id for new league
    
    // console.log('newLeagueID: ', newLeagueID)
    // create new league and store in firestore
    this.afs.collection('Leagues').doc(this.leagueID).set({
      currentPick: 1,
      currentRound: 1,
      draftedPlayers: [],
      name: 'New Draft',
      numRounds: 15,
      numTeams: 12,
      positions: {
        B: 6,
        DEF: 1,
        K: 1,
        QB: 1,
        QRWT: 0,
        RB: 2,
        RWT: 1,
        TE: 1,
        WR: 2,
      },
    }).then(() => {
      // set the leagueID
      // this.leagueID = newLeagueID;
      // store the leagueID under the corresponding user in Users table of firestore
      // callback(newLeagueID);

      console.log('this.leagueID: ', this.leagueID);

      console.log(this.teams);
      let newTeamsCollection = this.afs.collection(`Leagues/${this.leagueID}/teams`)

      for (let i = 0; i < 16; i ++) {
        let newTeamID = this.afs.createId();
        if (i == 0) {
          this.afs.collection('Leagues').doc(this.leagueID).update({myTeamID: newTeamID});
        }
        newTeamsCollection.doc(newTeamID).set({
          'manager': `Team ${i+1}`,
          'name': `Team ${i+1}`,
          'pick': i+1,
          picks: [
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
            {
              player: {},
              team: {
                teamID: newTeamID,
                manager: `Team ${i+1}`
              }
            },
          ],
          roster: {
            B: [1,2,3,4,5,6],
            DEF: [1],
            K: [1],
            QB: [1],
            QRWT: [],
            RB: [1,2],
            RWT: [1],
            TE: [1],
            WR: [1,2],
          },
        });
      }

      // this.initLeague();
      // generate new team IDs and update in firestore
      // this.teams.forEach(team => {

      //   // let newTeamID = this.afs.createId();

      //   this.afs.collection(`Leagues/${this.leagueID}/teams`).add({name: 'team-name'});

      // });

      

      // use the reset draft picks function to add draft picks
      // this.resetFirestoreDraftPicks();

      //use the reset rosters function to add rosters
      // this.resetFirestoreRosters();


    }); // END of .then() of League Doc
  }

  resetDraft():void {
    //reset the drafted players
    this.draftedPlayers = [];
    // this.storage.set('WAX_draftedPlayers', this.draftedPlayers);
    this.leagueDoc.update({ 'draftedPlayers': [] });

    //reset the current round & pick numbers
    this.league.currentRound = 1;
    this.league.currentPick = 1;
    this.leagueDoc.update({ 'currentRound': this.league.currentRound });
    this.leagueDoc.update({ 'currentPick': this.league.currentPick });
    // this.storage.set('WAX_currentRound', this.currentRound);
    // this.storage.set('WAX_currentPick', this.currentPick);
    console.log(this.teams);

    //reset the teams' picks
    this.resetFirestoreDraftPicks();

    //reset the teams' rosters
    this.resetFirestoreRosters();
  }

  resetFirestoreDraftPicks() {
    // unsubscribe real swiftly
    if (this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }

    // update the teams and wipe all the picks
    this.teams.forEach(team => {
      //create new pick with team info
      let pick = {
        'player': {},
        'team': {
          'manager':  team.manager,
          'teamID': team.teamID,
          'name': team.name,
        }
      }

      // create new picks array with new pick
      let newPicksArray = [];
      for (let i = 0; i < this.league.numRounds; i++) {
        newPicksArray.push(pick);
      }


      this.teamsCollection.doc(team.teamID).update({'picks': newPicksArray});
    });
    // re-subscribe real quick
    this.teamsSubscription = this.teamsCollection.valueChanges({idField:'teamID'}).subscribe((data)=>{
      this.teams = data;
    });
  }

  resetFirestoreRosters() {
    // unsubscribe real swiftly
    if (this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }

    // update the teams and add (or reset) roster
    this.teams.forEach(team => {
      //create new roster object
      let newRoster = {
        B: [1,2,3,4,5],
        DEF: [1],
        K: [1],
        QB: [1],
        QRWT: [],
        RB: [1,2],
        RWT: [1],
        TE: [1],
        WR: [1,2],
      };

      this.teamsCollection.doc(team.teamID).update({'roster': newRoster});
    });

    // re-subscribe real quick
    this.teamsSubscription = this.teamsCollection.valueChanges({idField:'teamID'}).subscribe((data)=>{
      this.teams = data;
    });
  }

}
