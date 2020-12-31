import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draft-board',
  templateUrl: './draft-board.page.html',
  styleUrls: ['./draft-board.page.scss'],
})
export class DraftBoardPage implements OnInit {

  constructor() { }

  slideOpts = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 8,
    slidesPerView: 3,
    freeMode: false,
    loop: false
  };

  ngOnInit() {
  }

  teams = [
    {
      name:"Original Recipe",
      draftSpot: 1,
      picks: [
        {pick:1,player:0,team:0},
        {pick:12,player:0,team:0},
        {pick:1,player:0,team:0},
        {pick:12,player:0,team:0},
        {pick:1,player:0,team:0},
        {pick:12,player:0,team:0},
        {pick:1,player:0,team:0},
        {pick:12,player:0,team:0},
        {pick:1,player:0,team:0},
        {pick:12,player:0,team:0},
        {pick:1,player:0,team:0},
        {pick:12,player:0,team:0},
        {pick:1,player:0,team:0},
        {pick:12,player:0,team:0},
        {pick:1,player:0,team:0},
      ]
    },
    {
      name:"Jurasskicked Park",
      draftSpot: 2,
      picks: [
        {pick:1,player:0,team:1},
        {pick:2,player:0,team:1},
        {pick:3,player:0,team:1},
        {pick:4,player:0,team:1},
        {pick:5,player:0,team:1},
        {pick:6,player:0,team:1},
        {pick:7,player:0,team:1},
        {pick:8,player:0,team:1},
        {pick:9,player:0,team:1},
        {pick:10,player:0,team:1},
        {pick:11,player:0,team:1},
        {pick:12,player:0,team:1},
        {pick:13,player:0,team:1},
        {pick:14,player:0,team:1},
        {pick:15,player:0,team:1},
      ]
    },
    {
      name:"YoungHamstringInjury",
      draftSpot: 3,
      picks: [
        {pick:1,player:0,team:2},
        {pick:2,player:0,team:2},
        {pick:3,player:0,team:2},
        {pick:4,player:0,team:2},
        {pick:5,player:0,team:2},
        {pick:6,player:0,team:2},
        {pick:7,player:0,team:2},
        {pick:8,player:0,team:2},
        {pick:9,player:0,team:2},
        {pick:10,player:0,team:2},
        {pick:11,player:0,team:2},
        {pick:12,player:0,team:2},
        {pick:13,player:0,team:2},
        {pick:14,player:0,team:2},
        {pick:15,player:0,team:2},
      ]
    },
    {
      name:"The Commish",
      draftSpot: 4,
      picks: [
        {pick:1,player:0,team:3},
        {pick:2,player:0,team:3},
        {pick:3,player:0,team:3},
        {pick:4,player:0,team:3},
        {pick:5,player:0,team:3},
        {pick:6,player:0,team:3},
        {pick:7,player:0,team:3},
        {pick:8,player:0,team:3},
        {pick:9,player:0,team:3},
        {pick:10,player:0,team:3},
        {pick:11,player:0,team:3},
        {pick:12,player:0,team:3},
        {pick:13,player:0,team:3},
        {pick:14,player:0,team:3},
        {pick:15,player:0,team:3},
      ]
    },
    {
      name:"Crim de la Squish",
      draftSpot: 5,
      picks: [
        {pick:1,player:0,team:4},
        {pick:2,player:0,team:4},
        {pick:3,player:0,team:4},
        {pick:4,player:0,team:4},
        {pick:5,player:0,team:4},
        {pick:6,player:0,team:4},
        {pick:7,player:0,team:4},
        {pick:8,player:0,team:4},
        {pick:9,player:0,team:4},
        {pick:10,player:0,team:4},
        {pick:11,player:0,team:4},
        {pick:12,player:0,team:4},
        {pick:13,player:0,team:4},
        {pick:14,player:0,team:4},
        {pick:15,player:0,team:4},
      ]
    },
    {
      name:"Misfit Toyz",
      draftSpot: 6,
      picks: [
        {pick:1,player:0,team:5},
        {pick:2,player:0,team:5},
        {pick:3,player:0,team:5},
        {pick:4,player:0,team:5},
        {pick:5,player:0,team:5},
        {pick:6,player:0,team:5},
        {pick:7,player:0,team:5},
        {pick:8,player:0,team:5},
        {pick:9,player:0,team:5},
        {pick:10,player:0,team:5},
        {pick:11,player:0,team:5},
        {pick:12,player:0,team:5},
        {pick:13,player:0,team:5},
        {pick:14,player:0,team:5},
        {pick:15,player:0,team:5},
      ]
    },
    {
      name:"Bless'em",
      draftSpot: 7,
      picks: [
        {pick:1,player:0,team:6},
        {pick:2,player:0,team:6},
        {pick:3,player:0,team:6},
        {pick:4,player:0,team:6},
        {pick:5,player:0,team:6},
        {pick:6,player:0,team:6},
        {pick:7,player:0,team:6},
        {pick:8,player:0,team:6},
        {pick:9,player:0,team:6},
        {pick:10,player:0,team:6},
        {pick:11,player:0,team:6},
        {pick:12,player:0,team:6},
        {pick:13,player:0,team:6},
        {pick:14,player:0,team:6},
        {pick:15,player:0,team:6},
      ]
    },
    {
      name:"ChirpChirp13",
      draftSpot: 8,
      picks: [
        {pick:1,player:0,team:7},
        {pick:2,player:0,team:7},
        {pick:3,player:0,team:7},
        {pick:4,player:0,team:7},
        {pick:5,player:0,team:7},
        {pick:6,player:0,team:7},
        {pick:7,player:0,team:7},
        {pick:8,player:0,team:7},
        {pick:9,player:0,team:7},
        {pick:10,player:0,team:7},
        {pick:11,player:0,team:7},
        {pick:12,player:0,team:7},
        {pick:13,player:0,team:7},
        {pick:14,player:0,team:7},
        {pick:15,player:0,team:7},
      ]
    },
    {
      name:"All Bidness",
      draftSpot: 9,
      picks: [
        {pick:1,player:0,team:8},
        {pick:2,player:0,team:8},
        {pick:3,player:0,team:8},
        {pick:4,player:0,team:8},
        {pick:5,player:0,team:8},
        {pick:6,player:0,team:8},
        {pick:7,player:0,team:8},
        {pick:8,player:0,team:8},
        {pick:9,player:0,team:8},
        {pick:10,player:0,team:8},
        {pick:11,player:0,team:8},
        {pick:12,player:0,team:8},
        {pick:13,player:0,team:8},
        {pick:14,player:0,team:8},
        {pick:15,player:0,team:8},
      ]
    },
    {
      name:"NuKLearWar",
      draftSpot: 10,
      picks: [
        {pick:1,player:0,team:9},
        {pick:2,player:0,team:9},
        {pick:3,player:0,team:9},
        {pick:4,player:0,team:9},
        {pick:5,player:0,team:9},
        {pick:6,player:0,team:9},
        {pick:7,player:0,team:9},
        {pick:8,player:0,team:9},
        {pick:9,player:0,team:9},
        {pick:10,player:0,team:9},
        {pick:11,player:0,team:9},
        {pick:12,player:0,team:9},
        {pick:13,player:0,team:9},
        {pick:14,player:0,team:9},
        {pick:15,player:0,team:9},
      ]
    },
    {
      name:"Rick Swift Old Bitch",
      draftSpot: 11,
      picks: [
        {pick:1,player:0,team:10},
        {pick:2,player:0,team:10},
        {pick:3,player:0,team:10},
        {pick:4,player:0,team:10},
        {pick:5,player:0,team:10},
        {pick:6,player:0,team:10},
        {pick:7,player:0,team:10},
        {pick:8,player:0,team:10},
        {pick:9,player:0,team:10},
        {pick:10,player:0,team:10},
        {pick:11,player:0,team:10},
        {pick:12,player:0,team:10},
        {pick:13,player:0,team:10},
        {pick:14,player:0,team:10},
        {pick:15,player:0,team:10},
      ]
    },
    {
      name:"Firestorm of Crap",
      draftSpot: 12,
      picks: [
        {pick:1,player:0,team:11},
        {pick:2,player:0,team:11},
        {pick:3,player:0,team:11},
        {pick:4,player:0,team:11},
        {pick:5,player:0,team:11},
        {pick:6,player:0,team:11},
        {pick:7,player:0,team:11},
        {pick:8,player:0,team:11},
        {pick:9,player:0,team:11},
        {pick:10,player:0,team:11},
        {pick:11,player:0,team:11},
        {pick:12,player:0,team:11},
        {pick:13,player:0,team:11},
        {pick:14,player:0,team:11},
        {pick:15,player:0,team:11},
      ]
    }
  ];

  draft = {
    settings: {
      numRounds: 15,
      numTeams: 15
    },
    slides: [
      {
        team: 'AyFiP7mYPsxaBwUcEkOX',
        picks: [
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 1,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 24,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 25,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 36,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 37,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 48,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 49,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 60,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 61,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 72,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 73,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 84,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 85,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 96,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 97,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 108,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 109,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 120,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 121,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 132,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 133,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 144,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 145,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 156,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 157,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 168,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 169,
            player: '',
          }
        ]
      },
      {
        team: 'HrSXVERVg5qAn9J5Pp3W',
        picks: [
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 2,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 23,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 26,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 35,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 38,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 47,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 50,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 59,
            player: '',
          },
          {
            team: 'AyFiP7mYPsxaBwUcEkOX',
            number: 62,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 71,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 74,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 83,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 86,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 95,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 98,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 107,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 110,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 119,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 122,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 131,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 134,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 143,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 146,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 155,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 158,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 167,
            player: '',
          },
          {
            team: 'HrSXVERVg5qAn9J5Pp3W',
            number: 170,
            player: '',
          }
        ]
      },
    ]
  };

}
