import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxRangeModule } from 'ngx-range';

import { DraftBoardPageRoutingModule } from './draft-board-routing.module';

import { DraftBoardPage } from './draft-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxRangeModule,
    DraftBoardPageRoutingModule
  ],
  declarations: [DraftBoardPage]
})
export class DraftBoardPageModule {}
