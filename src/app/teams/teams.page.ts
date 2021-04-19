import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { LeagueService } from '../services/league.service';
import { PlayersService } from '../services/players.service';
import { TeamsService } from '../services/teams.service';

interface Team {
  manager: string;
  name: string;
  pick: number;
  picks: Array<any>;
  roster: Array<any>;
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  myTeamId = "AyFiP7mYPsxaBwUcEkOX";
  myTeam:Team;
  teams = [];
  leagueID = "llDbnhbfhSiKqOjsN6jl";

  myTeamSlideOpts = {
    initialSlide: 0,
    centeredSlides: true,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    slidesPerView: 1.25,
    freeMode: false,
    loop: false
  };

  slideOpts = {
    initialSlide: 0,
    centeredSlides: true,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 8,
    slidesPerView: 1.25,
    freeMode: false,
    loop: false
  };

  constructor(
    public pService: PlayersService,
    public tService: TeamsService,
    public lService: LeagueService,
    public auth: AuthService,
    public app: AppComponent
    ) {
      this.initTeams();
      
    }

  ngOnInit() {
    // this.initTeams();
  }

  ionViewWillEnter() {
    if (this.leagueID != this.app.leagueID) {
      console.log('pulling new teams');
      this.initTeams();

    }
  }

  ionViewDidEnter() {
    // console.log(this.teams);
    // console.log(this.myTeam);
    
  }

  initTeams():void {
    let teams = this.tService.getTeams();
    // console.log(teams);
    teams.forEach((doc) => {
      this.teams = [];
      doc.forEach((team)=> {
        // console.log(team)
        if (team.teamID == this.myTeamId) {
          this.myTeam = team;
          console.log(team);
        }
        else {
          this.teams.push(team);
        }
        this.leagueID = this.app.leagueID;
      })      
    })
  }

  resetDraft():void {
    
  }
  

}
