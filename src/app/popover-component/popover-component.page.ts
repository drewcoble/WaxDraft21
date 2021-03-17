import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.page.html',
  styleUrls: ['./popover-component.page.scss'],
})
export class PopoverComponentPage implements OnInit {

  constructor(private popover:PopoverController) { }

  ngOnInit() {
  }

  closePopover()
   {
     this.popover.dismiss();
   }
}
