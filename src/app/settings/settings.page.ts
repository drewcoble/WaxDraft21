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
  public teams: any;
  private teamsChanged: boolean = false;
  // public newTeams: any;

  public currentSettingsObj: any;
  private newSettingsObj: any;
  private settingsChanged: boolean = false;

  constructor(
      public auth: AuthService,
      public lService: LeagueService
    ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.currentSettingsObj = this.lService.getLeagueSettings();
    this.teams = this.lService.getTeams(); // gets teams to display/manipulate

    this.newSettingsObj = "";
    this.teamsChanged = false;
    // this.newTeams = "";

    console.log(this.currentSettingsObj);
  }

  ionViewWillLeave() {
    // if any settings have changed, push them to firestore (through lService)
    if (this.currentSettingsObj != this.newSettingsObj) {
      console.log('Sumthin dun changed');
    }
    // if any teams have changed, push them to firestore (through lService)
    if (this.teamsChanged) {
      console.log(this.teams);

      // loop through to change draft pick of each team
      let teamIndex = 0;
      this.teams.forEach(team => {
        team.pick = teamIndex + 1
        teamIndex ++;
      })

      // pass the updated teams array to league service
      this.lService.updateTeams(this.teams);
    }
  }

  updateSettingsObj() {

  }

  updateTeamManager(event, teamIdx) {
    this.teams[teamIdx].manager = event.target.value;
    this.teamsChanged = true;
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    this.teamsChanged = true;
    this.teams = ev.detail.complete(this.teams);

    console.log(this.teams);
  }

  // syncDraft():void {
  //   console.log('sync draft');
  // }

  resetDraft():void {
    console.log('reset draft');
  }

}
