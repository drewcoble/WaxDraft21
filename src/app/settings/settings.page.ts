import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LeagueService } from '../services/league.service';

import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild (IonReorderGroup) reorderGroup: IonReorderGroup;

  public leagueSettings: boolean = false;
  public teamSettings: boolean = false;
  public positionSettings: boolean = false;
  public userSettings: boolean = false;

  // public oldTeams: any;
  // public teams: any;
  // private teamOrderChanged: boolean = false;
  private teamPicksChanged:boolean = false;
  // public newTeams: any;

  public currentLeague: any;
  private settingsChanged: boolean = false;

  constructor(
      public auth: AuthService,
      public lService: LeagueService
    ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    // this.currentLeague = this.lService.getLeague();
    // this.teams = this.lService.getTeams(); // gets teams to display/manipulate

    // this.newSettingsObj = "";
    // this.teamOrderChanged = false;
    // this.teamPicksChanged = false;
    // this.settingsChanged = false;
    // this.newTeams = "";
  }

  ionViewWillLeave() {
    
  }

  updateSettings($event) {
    this.lService.league[$event.target.name] = Number($event.detail.value);
    // console.log($event.target.name);
    // console.log(this.lService.league[$event.target.name]);

    if(this.lService.leagueDoc) {
      this.lService.leagueDoc.update({"numTeams": this.lService.league.numTeams});
    }
  }

  updateRosterPositions($event) {
    // console.log($event.target.name);
    let pos = $event.target.name;
    let numPos:number = Number($event.detail.value);

    let newPosArray = [];
    // generate a new array to put in the rosters
    for (let i = 0; i < numPos; i++) {
      newPosArray[i] = 'player' + i;
    }
    // console.log(newPosArray);

    // set the league positions setting
    this.lService.league.positions[pos] = numPos;
    if (this.lService.leagueDoc) {
      this.lService.leagueDoc.update({"positions": this.lService.league.positions});
    }

    // set the position for each team
    this.lService.teams.forEach(team => {
      team.roster[pos] = newPosArray;
    })

    // this.lService.league.positions[$event.target.name] = $event.detail.value;

    // console.log(this.lService.league.positions[$event.target.value]);

    console.log(this.lService.league.positions);


    // let numRounds = this.calcNumRounds();
    // console.log(numRounds);


    // this.settingsChanged = true;
    // this.teamPicksChanged = true;
  }

  calcNumRounds() {
    let numRounds = 0;
    let posArray = ['QB', 'RB', 'WR', 'TE', 'DEF', 'K', 'RWT', 'QRWT', 'B'];

    for (let i = 0; i < posArray.length; i++) {
      numRounds += this.lService.league.positions[posArray[i].length];
    }
    
    this.lService.league.numRounds = numRounds;
  }

  updateTeamManager(event, teamIdx) {
    this.lService.teams[teamIdx].manager = event.target.value;
    if (this.lService.teamsCollection) {
      this.lService.teamsCollection.doc(this.lService.teams[teamIdx].teamID).update({'manager': event.target.value});
    }
    // this.teamsChanged = true;
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // this.teamOrderChanged = true;
    this.lService.teams = ev.detail.complete(this.lService.teams);


    let teamIndex = 0;
    this.lService.teams.forEach(team => {
      team.pick = teamIndex + 1
      teamIndex ++;
    })

    if (this.lService.teamsCollection) {
      this.lService.updateTeams();
    }
    console.log(this.lService.teams);
  }

  // syncDraft():void {
  //   console.log('sync draft');
  // }

  resetDraft():void {
    console.log('reset draft');
  }

}
