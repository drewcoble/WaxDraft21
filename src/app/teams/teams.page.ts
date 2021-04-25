import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { LeagueService } from '../services/league.service';
import { PlayersService } from '../services/players.service';
// import { TeamsService } from '../services/teams.service';

import { Team } from '../interfaces/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  myTeamId = "newTeam1";
  myTeam: Team;
  leagueTeams = [];
  leagueID;

  myTeamSlideOpts = {
    initialSlide: 0,
    centeredSlides: true,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    slidesPerView: 1.5,
    freeMode: false,
    loop: false
  };

  slideOpts = {
    initialSlide: 0,
    centeredSlides: true,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 8,
    slidesPerView: 1.45,
    freeMode: false,
    loop: false
  };

  constructor(
    public pService: PlayersService,
    // public tService: TeamsService,
    public lService: LeagueService,
    public auth: AuthService,
    public app: AppComponent
    ) {   
      // this.initTeams();
    }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    // console.log(this.lService.teams);
    // this.initTeams();
    // if (this.leagueID != this.app.leagueID) {
    //   console.log('pulling new teams');
    //   this.initTeams();

    // }
    console.log(this.lService.league);
  }

  ionViewDidEnter() {
    // console.log(this.app.leagueTeams);
    // console.log(this.app.allTeams);
    // console.log(this.app.myTeam);
    // console.log(this.myTeam);
    
    
  }

  initTeams():void {
    // let teamsDocs = this.lService.getTeams();
    // // console.log(teams);
    // teamsDocs.forEach((doc) => {
    //   this.leagueTeams = [];
    //   doc.forEach((team)=> {
    //     // console.log(team)
    //     if (team.teamID == this.myTeamId) {
    //       this.myTeam = team;
    //       console.log(team);
    //     }
    //     else {
    //       this.leagueTeams.push(team);
    //     }
    //     this.leagueID = this.app.leagueID;
    //   })      
    // })
  }

  resetDraft():void {

  }
  

}
