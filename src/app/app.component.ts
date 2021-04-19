import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { PlayersService } from './services/players.service';
import { LeagueService } from './services/league.service';
import { TeamsService } from './services/teams.service';
const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  players = [];

  //wax museum league id for testing
  leagueID = "llDbnhbfhSiKqOjsN6jl";

  constructor(
    private platform: Platform,
    private pService: PlayersService,
    private lService: LeagueService,
    private tService: TeamsService,
  ) {
    this.getPlayersFromFirestore();
    this.initializeApp();
    this.initLeague();
    // this.tService.resetDraft();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

  getPlayersFromFirestore() {
    this.pService.getAllPlayers().forEach((doc) =>{
      this.players = [];
      // console.log(doc);
      doc.forEach((player)=> {
        // console.log(player);
        this.players.push( {'id': player.playerID,'data': player, 'drafted': false});
      })
    })
  }

  initLeague() {
    this.lService.getLeague().forEach((doc)=>{
      if (this.lService.leagueSettings.positions != doc.positions) {
        // console.log(this.lService.leagueSettings.positions);
        this.lService.leagueSettings.positions = doc.positions;
        this.lService.leagueSettings.rounds = doc.positions.length;
      }
      // console.log(doc);
    })
    // console.log(this.lService.leagueSettings.rounds);
  }

  //
  setLeagueID(leagueID) {
    this.leagueID = leagueID;
  }


}
