import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LeagueService } from '../services/league.service';

import { AlertController, IonReorderGroup } from '@ionic/angular';
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
      public lService: LeagueService,
      public alertController: AlertController,
    ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {

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
    let pos = $event.target.name;
    let numPos:number = Number($event.detail.value);

    // set the league positions setting
    this.lService.league.positions[pos] = numPos;
    if (this.lService.leagueDoc) {
      this.lService.leagueDoc.update({"positions": this.lService.league.positions});
    }

    //update the team rosters
    

    // set the position for each team
    this.lService.teams.forEach((team, idx) => {  
      // create an array for this position
      let newPosArray = [];
      // fill the array either with existing players or a string
      for (let i = 0; i < numPos; i++) {
        if (typeof team.roster[pos][i] === 'object' && team.roster[pos][i] !== null) {
          newPosArray[i] = team.roster[pos][i];
        }
        else {
          newPosArray[i] = 'player' + i;
        }
        
      }
      // console.log(team.manager, newPosArray);

      team.roster[pos] = newPosArray;
      if (this.lService.teamsCollection) {
        this.lService.teamsCollection.doc(this.lService.teams[idx].teamID).update({"roster": this.lService.teams[idx].roster});
      }
    })

    // this.lService.league.positions[$event.target.name] = $event.detail.value;

    // console.log(this.lService.league.positions[$event.target.value]);

    console.log(this.lService.league.positions);


    this.calcNumRounds();
  }

  calcNumRounds() {
    let numRounds = 0;
    let posArray = ['QB', 'RB', 'WR', 'TE', 'DEF', 'K', 'RWT', 'QRWT', 'B'];

    for (let i = 0; i < posArray.length; i++) {
      numRounds += this.lService.league.positions[posArray[i]];
    }
    // console.log(numRounds);

    this.lService.league.numRounds = numRounds;
    if (this.lService.leagueDoc){
      this.lService.leagueDoc.update({"numRounds": numRounds});
      // this.lService.resetFirestoreDraftPicks();
      // unsubscribe real swiftly
    if (this.lService.teamsSubscription) {
      this.lService.teamsSubscription.unsubscribe();
    }

    // update the teams and wipe all the picks
    this.lService.teams.forEach((team, teamIdx) => {

      // create new picks array
      let newPicksArray = [];
      // loop to fill the picks array
      for (let i = 0; i < this.lService.league.numRounds; i++) {
        let pick = {};
        // if the pick exists, use it
        if (team.picks[i]) {
          pick = {
            'player': team.picks[i].player,
            'team': team.picks[i].team
          }
        }
        // or create a new pick to use
        else {
          pick = {
            'player': {},
            'team': {
              'manager': team.manager,
              'teamID': team.teamID
            }
          }
        }
        // add the pick to the array
        newPicksArray.push(pick);
      }

      // add the array to the right places
      this.lService.teams[teamIdx].picks = newPicksArray;
      if (this.lService.teamsCollection) {
        this.lService.teamsCollection.doc(team.teamID).update({'picks': newPicksArray});
      }
    });

    // console.log(this.teams);
    // re-subscribe real quick
    this.lService.teamsSubscription = this.lService.teamsCollection.valueChanges({idField:'teamID'}).subscribe((data)=>{
      this.lService.teams = data;
    });
    }
  }

  updateTeamManager(event, teamIdx) {
    this.lService.teams[teamIdx].manager = event.target.value;
    //create a new 'team' object for any draft picks belonging to this team
    let newTeamPicks = [];
    let newPickTeam = {
      "manager": event.target.value,
      "teamID": this.lService.teams[teamIdx].teamID
    }
    //update every pick for this team to the new name
    this.lService.teams[teamIdx].picks.forEach(pick => {
      let newPick = {
        "player": pick.player,
        "team": newPickTeam
      }
      newTeamPicks.push(newPick);
    })
    // console.log(newTeamPicks);

    if (this.lService.teamsCollection) {
      this.lService.teamsCollection.doc(this.lService.teams[teamIdx].teamID).update({"manager": event.target.value, "picks": newTeamPicks});
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

  resetDraft():void {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header: 'Reset Draft?',
      message: 'This will wipe all team rosters and draft picks.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Reset',
          cssClass: 'reset-button',
          handler: () => {
            console.log('Reset Confirmed');
            this.lService.resetDraft();
          }
        }
      ]
    });

    await alert.present();
  }

}
