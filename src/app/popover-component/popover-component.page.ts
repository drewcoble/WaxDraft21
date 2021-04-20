import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { LeagueService } from '../services/league.service';

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.page.html',
  styleUrls: ['./popover-component.page.scss'],
})
export class PopoverComponentPage implements OnInit {
  public player = {
    data: {
      name: ""
    }
  };

  public team:string;
  public pickRound: number;
  public pickNum: number;

  constructor(private popover:PopoverController, public navParams:NavParams, public lService:LeagueService) {
    this.player = navParams.get('player');
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
