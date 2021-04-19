import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { PlayersService } from './services/players.service';
import { LeagueService } from './services/league.service';
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
    private lService: LeagueService
  ) {
    this.getPlayersFromFirestore();
    this.initializeApp();
    this.initLeague();
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
        console.log(this.lService.leagueSettings.positions);
        this.lService.leagueSettings.positions = doc.positions;
      }
      console.log(doc);
    })
  }

  //
  setLeagueID(leagueID) {
    this.leagueID = leagueID;
  }


}
