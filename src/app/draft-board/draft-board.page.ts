import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlayersService } from '../services/players.service';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-draft-board',
  templateUrl: './draft-board.page.html',
  styleUrls: ['./draft-board.page.scss'],
})
export class DraftBoardPage implements OnInit {

  constructor(
    public pService: PlayersService,
    public tService: TeamsService,
    public auth: AuthService,
  ) {
  }

  slideOpts = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    slidesPerView: 3,
    freeMode: false,
    loop: false
  };

  ngOnInit() {

  }

  ionViewWillEnter() {
    let teams = this.tService.getTeams();
    // console.log(teams);
    
    teams.forEach((doc) => {
      this.teams = [];
      doc.forEach((team)=> {
        this.teams.push(team);
      })      
    })
    console.log(this.teams);  
  }

  ionViewDidEnter() {
    
  }

  draftSettings = {
    numRounds: 15
  };

  teams = [];

  calcPickNumber(draftSlot, draftRound):number {
    if (draftRound%2 == 0) {
      return 13 - draftSlot;
    }
    else {
      return draftSlot;
    }
  }


}
