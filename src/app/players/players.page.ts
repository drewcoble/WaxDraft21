import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlayersService } from '../services/players.service';
import { Storage } from '@ionic/storage';

import { ToastController, PopoverController, IonContent } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';
import { AppComponent } from '../app.component';
import { LeagueService } from '../services/league.service';

// import { PopoverController } from '@ionic/angular';
// import { PopoverComponent } from '../../component/popover/popover.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  players = [];

  isUser = false;

  newUser:boolean = true;

  welcomeSlideOpts = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 220,
    spaceBetween: -1,
    slidesPerView: 1,
    freeMode: false,
    loop: false
  };

  positions = [
    "QB", "RB", "WR", "TE", "DEF", "K"
  ];

  slideOpts = {
    initialSlide: 1,
    direction: 'horizontal',
    centeredSlides: false,
    speed: 220,
    spaceBetween: 0,
    slidesPerView: 2,
    freeMode: true,
    freeModeSticky: true,
    freeModeMomentumRatio: 0.4,
    freeModeMomentumVelocityRatio: 0.6,
    loop: false,
    grabCursor: 'true'
  };

  constructor(
    public auth: AuthService,
    private storage: Storage,
    public toastCtrl: ToastController,
    public pService: PlayersService,
    public lService: LeagueService,
    public popoverController: PopoverController,
    public app: AppComponent
  ) {
    
  }

  ngOnInit() {
    // this.lService.initLeague();

    // GET all players from firestore (through the players service)
    // let players = this.pService.getAllPlayers();
    // console.log(players);
    // this.players = [];
    // players.forEach((doc)=> {
    //   // console.log("Doc: ", doc);
    //   doc.forEach((player)=> {
    //     // console.log(player);
    //     if (!this.players.includes(player))
    //     this.players.push(player);
    //   })
    // })
  }

  ionViewWillEnter() {
    
  }

  ionViewDidEnter() {
  }

  async presentPopover(ev: any, player, callback) {
    let teamName = "";
    if (this.lService.league.currentRound % 2 == 1) {
      teamName = this.lService.teams[this.lService.league.currentPick - 1].picks[this.lService.league.currentRound - 1].team.manager;
    }
    else {
      teamName = this.lService.teams[this.lService.league.numTeams - this.lService.league.currentPick].picks[this.lService.league.currentRound - 1].team.manager;
    }

    const popover = await this.popoverController.create({
      component: PopoverComponentPage,
      componentProps: {
        'player': player,
        'callback': callback,
        'round': this.lService.league.currentRound,
        'pick': this.lService.league.currentPick,
        'team': teamName,
      },
      cssClass: 'popover-styles',
      // event: ev,
      translucent: true
    });
    return await popover.present();
  }


  async signInToast() {
    const toast = await this.toastCtrl.create({
      // header: 'Toast header',
      message: 'Sign in to save your draft.',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          // icon: 'star',
          text: 'Sign In',
          handler: () => {
            console.log('Sign in clicked');
            this.auth.login();
          }
        },
        // {
        //   side: 'end',
        //   // icon: 'star',
        //   text: 'Sign Up',
        //   handler: () => {
        //     console.log('Sign up clicked');
        //   }
        // },
        {
          text: 'Later',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  dismissIntro():void {
    this.newUser = false;
    this.storage.set('waxDraft_showintro', false);
    this.signInToast();
  }

  draftPlayer(player):void {
    // console.log(player);
    // alert("Draft " + player.data.name + "?");
    this.presentPopover('click', player, this.ionViewDidEnter);
  }

    getAdpColor(adp) {
      let pick = ((this.lService.league.currentRound - 1) * this.lService.league.numTeams) + this.lService.league.currentPick;
      // console.log(pick);
      if (pick <= (adp - 8)) {
        return "#eb445a";
      }
      else if (pick >= (adp + 8)) {
        return '#2dd36f';
      }
      else {
        return "#fcfefe";
      }
    }
  

}
