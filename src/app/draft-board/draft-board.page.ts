import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { LeagueService } from '../services/league.service';
import { PlayersService } from '../services/players.service';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-draft-board',
  templateUrl: './draft-board.page.html',
  styleUrls: ['./draft-board.page.scss'],
})
export class DraftBoardPage implements OnInit {
  
  slideOpts = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    slidesPerView: 3,
    freeMode: false,
    loop: false
  };

  public teams;

  constructor(
    public pService: PlayersService,
    public tService: TeamsService,
    public lService: LeagueService,
    public auth: AuthService,
    public app: AppComponent
  ) {
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    // console.log(this.lService.teams);
    // console.log(this.lService.teams);
    // let teamsDocs = this.lService.getTeams();
    
    // teamsDocs.forEach((doc) => {
    //   this.teams = [];
    //   doc.forEach((team)=> {
    //     this.teams.push(team);
    //   })      
    // })
  }

  ionViewDidEnter() {
    // console.log(this.app.allTeams);  
    // this.lService.setActivePick();
  }


  calcPickNumber(draftSlot, draftRound):number {
    if (draftRound%2 == 0) {
      return 13 - draftSlot;
    }
    else {
      return draftSlot;
    }
  }

  checkActive(roundIdx:number, pickIdx:number) {
    let round = roundIdx + 1;
    let pick;

    if (round%2 == 0) {
      pick = 12 - pickIdx;
    }
    else {
      pick = pickIdx + 1;
    }

    if (round == this.lService.league.currentRound && pick == this.lService.league.currentPick) {
      return true;
    }
  }


}
