import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DraftBoardPage } from './draft-board.page';

const routes: Routes = [
  {
    path: '',
    component: DraftBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DraftBoardPageRoutingModule {}
