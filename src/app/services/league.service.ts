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
  private teamsCollection: AngularFirestoreCollection;
  private teamsSubscription;
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

    this.teams = [
      {
        manager: 'My Team',
        name: 'Team 1',
        pick: 1,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam1',
      },
      {
        manager: 'Team 2',
        name: 'Team 2',
        pick: 2,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam2',
      },
      {
        manager: 'Team 3',
        name: 'Team 3',
        pick: 3,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam3',
      },
      {
        manager: 'Team 4',
        name: 'Team 4',
        pick: 4,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam4',
      },
      {
        manager: 'Team 5',
        name: 'Team 5',
        pick: 5,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam5',
      },
      {
        manager: 'Team 6',
        name: 'Team 6',
        pick: 6,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam6',
      },
      {
        manager: 'Team 7',
        name: 'Team 7',
        pick: 7,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam7',
      },
      {
        manager: 'Team 8',
        name: 'Team 8',
        pick: 8,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam8',
      },
      {
        manager: 'Team 9',
        name: 'Team 9',
        pick: 9,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam9',
      },
      {
        manager: 'Team 10',
        name: 'Team 10',
        pick: 10,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam10',
      },
      {
        manager: 'Team 11',
        name: 'Team 11',
        pick: 11,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam11',
      },
      {
        manager: 'Team 12',
        name: 'Team 12',
        pick: 12,
        picks: [
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
            }
          },
          {
            player: {},
            team: {
              teamID: 'no-team'
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
        teamID: 'newTeam12',
      },
    ];

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

  updateTeams(newTeams) {
    console.log(newTeams);
    newTeams.forEach(team => {
      // console.log(team);
      this.teamsCollection.doc(team.teamID).update({'pick':team.pick, 'manager':team.manager, 'name':team.name});
    })
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

  addPlayerToRoster(player):void {
    console.log('add player to roster: ' + player.playerID);
    // console.log(this.draftedPlayers);
    this.popoverController.dismiss();
  }

  nextPick() {
    if (this.league.currentPick == 12) {
      this.league.currentPick = 1;
      this.league.currentRound ++;
    }
    else {
      this.league.currentPick ++;
    }
  }

  draftPlayer(player, callback):void {
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
    let newPicksArray = [];
    if (this.league.currentRound % 2 == 1) {
      newPicksArray = this.teams[this.league.currentPick - 1].picks;
    }
    else {
      newPicksArray = this.teams[12 - this.league.currentPick].picks;
    }
    //add the player to the new array
    newPicksArray[this.league.currentRound - 1].player = player;

    // add the drafted player to the draft spot
    //if it is an odd round
    if (this.teamsCollection) {
      if (this.league.currentRound % 2 == 1) {
        this.teamsCollection.doc(this.teams[this.league.currentPick - 1].teamID).update({'picks': newPicksArray});
      }

      //if it is an even round
      if (this.league.currentRound % 2 == 0) {
        this.teamsCollection.doc(this.teams[12 - this.league.currentPick].teamID).update({'picks': newPicksArray});
      }
    }
    
    
    // add the drafted player to the CORRECT team
    this.addPlayerToRoster(player);

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

    // refresh the DOM with callback function
    callback();
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

      for (let i = 0; i < 12; i ++) {
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
