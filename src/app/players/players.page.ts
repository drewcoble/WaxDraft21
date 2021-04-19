import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlayersService } from '../services/players.service';
import { Storage } from '@ionic/storage';

import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';
import { AppComponent } from '../app.component';

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
    speed: 300,
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
    speed: 300,
    spaceBetween: 8,
    slidesPerView: 2,
    freeMode: false,
    loop: false
  };

  constructor(
    public auth: AuthService,
    private storage: Storage,
    public toastCtrl: ToastController,
    public pService: PlayersService,
    public popoverController: PopoverController,
    public app: AppComponent
  ) {
    
  }

  ngOnInit() {
    if (!this.isUser
       //&& !this.newUser
       ) {
      // this.signInToast();
    }

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

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponentPage,
      cssClass: 'my-custom-class',
      event: ev,
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

  draftPlayer(playerID):void {
    alert("Draft " + playerID + "?");
  }

  flipCard(playerID) {
    // app = document.getElementById("app");
  }
  

}
