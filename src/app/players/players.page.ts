import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  positions = [
    "QB", "RB", "WR", "TE", "DEF"
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

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  login():void {
    console.log('login clicked');
    this.auth.login();
  }

  logout():void {
    console.log('logout clicked');
    this.auth.logout();
  }

  draftPlayer(playerId):void {
    alert("draft " + playerId);
  }


  // test data for players
  players = [
    // quarterbacks test data
    {
      id: 'patrick-mahomes',
      name: 'Patrick Mahomes',
      position: 'QB',
      posRank: 1,
      team: 'KC',
      bye: '10',
      tier: 'pink',
      stats: {
        y2020: {
          points: 30.47
        },
        y2021: {
          points: 0
        },
        pm: 8.33
      }
    },
    {
      id: 'aaron-rodgers',
      name: 'Aaron Rodgers',
      position: 'QB',
      posRank: 2,
      team: 'GB',
      bye: '10',
      tier: 'pink',
      stats: {
        y2020: {
          points: 29.40
        },
        y2021: {
          points: 0
        },
        pm: 6.86
      }
    },
    {
      id: 'russell-wilson',
      name: 'Russell Wilson',
      position: 'QB',
      posRank: 3,
      team: 'SEA',
      bye: '10',
      tier: 'pink',
      stats: {
        y2020: {
          points: 28.27
        },
        y2021: {
          points: 0
        },
        pm: 5.73
      }
    },
    {
      id: 'kyler-murray',
      name: 'Kyler Murray',
      position: 'QB',
      posRank: 1,
      team: 'ARI',
      bye: '10',
      tier: 'pink',
      stats: {
        y2020: {
          points: 29.40
        },
        y2021: {
          points: 0
        },
        pm: 6.86
      }
    },
    {
      id: 'josh-allen',
      name: 'Josh Allen',
      position: 'QB',
      posRank: 1,
      team: 'BUF',
      bye: '10',
      tier: 'blue',
      stats: {
        y2020: {
          points: 28.86
        },
        y2021: {
          points: 0
        },
        pm: 6.32
      }
    },
    {
      id: 'lamar-jackson',
      name: 'Lamar Jackson',
      position: 'QB',
      posRank: 10,
      team: 'BAL',
      bye: '8',
      tier: 'gold',
      stats: {
        y2020: {
          points: 25.33
        },
        y2021: {
          points: 0
        },
        pm: 2.79
      }
    },

    // running backs test data
    {
      id: 'dalvin-cook',
      name: 'Dalvin Cook',
      position: 'RB',
      posRank: 1,
      team: 'MIN',
      bye: '8',
      tier: 'pink',
      stats: {
        y2020: {
          points: 23.10
        },
        y2021: {
          points: 0
        },
        pm: 9.36
      }
    },
    {
      id: 'clyde-edwardshelaire',
      name: 'Clyde Edwards-Helaire',
      position: 'RB',
      posRank: 2,
      team: 'KC',
      bye: '10',
      tier: 'gold',
      stats: {
        y2020: {
          points: 12.15
        },
        y2021: {
          points: 0
        },
        pm: -1.59
      }
    },


    // wide receivers test data
    {
      id: 'davante-adams',
      name: 'Davante Adams',
      position: 'WR',
      posRank: 1,
      team: 'GB',
      tier: 'pink',
      stats: {
        y2020: {
          points: 20.80
        },
        y2021: {
          points: 0
        },
        pm: 7.08
      }
    },
    {
      id: 'tyreek-hill',
      name: 'Tyreek Hill',
      position: 'WR',
      posRank: 2,
      team: 'KC',
      tier: 'pink',
      stats: {
        y2020: {
          points: 19.78
        },
        y2021: {
          points: 0
        },
        pm: 6.06
      }
    },
    {
      id: 'keenan-allen',
      name: 'Keenan Allen',
      position: 'WR',
      posRank: 3,
      team: 'LAC',
      tier: 'blue',
      stats: {
        y2020: {
          points: 13.94
        },
        y2021: {
          points: 0
        },
        pm: 0.22
      }
    },

    // tight ends test data
    {
      id: 'travis-kelce',
      name: 'Travis Kelce',
      position: 'TE',
      posRank: 1,
      team: 'KC',
      tier: 'pink',
      stats: {
        y2020: {
          points: 17.21
        },
        y2021: {
          points: 0
        },
        pm: 8.97
      }
    },
    {
      id: 'darren-waller',
      name: 'Darren Waller',
      position: 'TE',
      posRank: 2,
      team: 'LV',
      tier: 'blue',
      stats: {
        y2020: {
          points: 13.51
        },
        y2021: {
          points: 0
        },
        pm: 5.27
      }
    },


    // defense test data
    {
      id: 'pit-def',
      name: 'PIT D',
      position: 'DEF',
      team: 'PIT',
      posRank: 1,
      tier: 'blue',
      stats: {
        y2020: {
          points: 13.81
        },
        y2021: {
          points: 0
        },
        pm: 4.85
      }
    },
    {
      id: 'lar-def',
      name: 'LAR D',
      position: 'DEF',
      posRank: 2,
      team: 'LAR',
      tier: 'blue',
      stats: {
        y2020: {
          points: 12.43
        },
        y2021: {
          points: 0
        },
        pm: 3.87
      }
    },
  ];

}
