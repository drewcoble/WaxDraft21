import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

import { PlayersService } from './services/players.service';
import { LeagueService } from './services/league.service';
// import { TeamsService } from './services/teams.service';

import { Team } from './interfaces/team';

const { SplashScreen, StatusBar } = Plugins;

interface MyTeam {
  manager?: string,
  roster?: any[],
  picks?: any[],
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // players = [];

  // myTeam: Team;
  // leagueTeams = [];
  // allTeams = [];

  //hold the drafted player id's
  // public draftedPlayers = [];

  //wax museum league id for testing
  // leagueID = "";
  // myTeamID = "AyFiP7mYPsxaBwUcEkOX";
  // leagueID = "llDbnhbfhSiKqOjsN6jl";

  constructor(
    private platform: Platform,
    // private pService: PlayersService,
    private lService: LeagueService,
    // private tService: TeamsService,
  ) {
    // this.getPlayersFromFirestore();
    // this.initPlayers();
    this.initializeApp();
    
    // if (this.leagueID) {
    //   this.initLeague();
    //   this.initTeams();
      
    // }
    // else {
    //   console.log("no league ID");
    // }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

  initPlayers() {
    // this.pService.getAllPlayers();
  }

  // getPlayersFromFirestore() {
  //   this.pService.getAllPlayers().forEach((doc) =>{
  //     this.players = [];
  //     // console.log(doc);
  //     doc.forEach((player)=> {
  //       // console.log(player);
  //       this.players.push( {'id': player.playerID,'data': player, 'drafted': false});
  //     })
  //   })
  // }

  initLeague() {
    //get league name

    //get league settings
      //get league positions
      // this.lService.getLeague();
      // .forEach((doc)=>{
      //   if (this.lService.leagueSettings.positions != doc.positions) {
      //     // console.log(this.lService.leagueSettings.positions);
      //     this.lService.leagueSettings.positions = doc.positions;
      //     // this.lService.leagueSettings.rounds = doc.rounds;
      //   }
      //   // console.log(this.lService.leagueSettings.rounds);
      // })
        //count positions to set number of rounds in draft
    
    //get league draft

    
    // console.log(this.lService.leagueSettings.rounds);
  }

  initTeams() {
    //get teams
    // this.lService.getTeams();
    
    // let teamsDocs = this.lService.getTeams();
    // // console.log(teams);
    // teamsDocs.forEach((doc) => {
    //   this.leagueTeams = [];
    //   this.allTeams = [];
    //   doc.forEach((team)=> {
    //     // console.log(team)
    //     //set myTeam
    //     if (team.teamID == this.myTeamID) {
    //       this.myTeam = team;
    //       this.allTeams.push(team);
    //       // console.log(team);
    //     }
    //     //set other league teams
    //     else {
    //       this.leagueTeams.push(team);
    //       this.allTeams.push(team);
    //     }
    //   })      
    // })

      //get team draft picks
      //get team rosters
  }

  //
  // setLeagueID(leagueID) {
  //   this.leagueID = leagueID;
  // }


}
