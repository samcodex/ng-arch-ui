import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgArchUiModule } from 'ng-arch-ui';

import { AppComponent } from './app.component';
import { UiExampleDesktopComponent } from './ui-components/ui-example-desktop/ui-example-desktop.component';
import { UserWindowComponent } from './ui-components/user-window/user-window.component';
import { UserInfoPanelComponent } from './ui-components/user-info-panel/user-info-panel.component';
import { BookWindowComponent } from './ui-components/book-window/book-window.component';
import { BookInfoPanelComponent } from './ui-components/book-info-panel/book-info-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    UiExampleDesktopComponent,
    UserWindowComponent,
    UserInfoPanelComponent,
    BookWindowComponent,
    BookInfoPanelComponent
  ],
  entryComponents: [
    UiExampleDesktopComponent,
    UserWindowComponent,
    UserInfoPanelComponent,
    BookWindowComponent,
    BookInfoPanelComponent
  ],
  imports: [
    BrowserModule,
    NgArchUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
