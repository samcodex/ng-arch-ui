import { UiExampleDesktopComponent } from './ui-components/ui-example-desktop/ui-example-desktop.component';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

import { NgArchUiService, ArchUiTheme, ArchUiType, ArchPartType, ThemeType } from 'ng-arch-ui';

const theme: ArchUiTheme = {
  [ ArchUiType.Window]: {
    [ArchPartType.Header]: {
      [ ThemeType.Focus ]: {
        color: 'black',
        background_color: 'gray'
      },
      [ ThemeType.FocusOut ]: {
        color: 'white',
      }
    }
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    NgArchUiService
  ]
})
export class AppComponent implements OnInit {
  title = 'NgArchUI Example';
  desktopData = {
    title: 'Main desktop',
    subTitle: 'window layout example'
  };

  constructor(
    private resolver: ComponentFactoryResolver,
    private ngArchUiService: NgArchUiService
  ) {
  }

  ngOnInit() {
    this.ngArchUiService.registerResolver(this.resolver);
    this.ngArchUiService.assignDesktopComponentClass(UiExampleDesktopComponent);

    // customize the default theme
    // this.ngArchUiService.changeTheme(theme);
  }
}
