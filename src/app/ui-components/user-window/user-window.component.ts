import { Component, OnInit } from '@angular/core';

import { ArchUi, NgArchUiService } from 'ng-arch-ui';
import { UserInfoPanelComponent } from '../user-info-panel/user-info-panel.component';

@Component({
  selector: 'app-user-window',
  templateUrl: './user-window.component.html',
  styleUrls: ['./user-window.component.css']
})
export class UserWindowComponent implements OnInit {
  UserName: string;
  Address: any;

  constructor(
    private ngArchUiService: NgArchUiService
  ) { }

  ngOnInit() {
  }

  displayUserDetail(event: Event) {
    event.stopPropagation();
    const userWindow = ArchUi.createPanelWithContentComponent('User Info', UserInfoPanelComponent);
    this.ngArchUiService.renderElementOnTop(userWindow);
  }
}
