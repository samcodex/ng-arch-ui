import { Component, OnInit } from '@angular/core';

import { UserWindowComponent } from './../user-window/user-window.component';
import { NgArchUiService, ArchUi, NgArchUiElementOptions } from 'ng-arch-ui';
import { BookWindowComponent } from '../book-window/book-window.component';

@Component({
  selector: 'app-ui-example-desktop',
  templateUrl: './ui-example-desktop.component.html',
  styleUrls: ['./ui-example-desktop.component.css']
})
export class UiExampleDesktopComponent implements OnInit {

  constructor(
    private ngArchUiService: NgArchUiService
  ) { }

  ngOnInit() {
  }

  clickUser(event: Event) {
    event.stopPropagation();
    const transferData = { UserName: 'Selina', Address: { City: 'Toronto', Country: 'Canada'}};

    const userWindow = ArchUi.createWindowWithContentComponent('User', UserWindowComponent);
    this.ngArchUiService.renderElementOnTop(userWindow, transferData);
  }

  clickBook(event: Event) {
    event.stopPropagation();

    const transferData = { title: 'Angular Tutorial'};
    const options: NgArchUiElementOptions = { left: 'auto', right: '10%', width: '70%'};

    const userWindow = ArchUi.createWindowWithContentComponent('Book', BookWindowComponent);
    this.ngArchUiService.renderElementOnTop(userWindow, transferData, options);
  }
}
