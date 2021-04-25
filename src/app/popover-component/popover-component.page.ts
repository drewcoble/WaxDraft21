import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { LeagueService } from '../services/league.service';
import { Player } from '../interfaces/player';

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.page.html',
  styleUrls: ['./popover-component.page.scss'],
})
export class PopoverComponentPage implements OnInit {
  public player: Player;
  public callback: any;

  public team:string;
  public pickRound: number;
  public pickNum: number;

  constructor(private popover:PopoverController, public navParams:NavParams, public lService:LeagueService) {
    this.player = navParams.get('player');
    this.callback = navParams.get('callback');
    this.pickRound = navParams.get('round');
    this.pickNum = navParams.get('pick');
    this.team = navParams.get('team');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
  
  }

  closePopover()
   {
     this.popover.dismiss();
   }
}
