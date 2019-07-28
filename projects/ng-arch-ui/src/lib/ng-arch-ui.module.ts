import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularDraggableModule } from 'angular2-draggable';

import { ArchActionComponent } from './components/actions/arch-action/arch-action.component';
import { ArchDropdownComponent } from './components/actions/arch-dropdown/arch-dropdown.component';
import { NgArchUiComponent } from './components/ng-arch-ui/ng-arch-ui.component';
import { ArchDockComponent } from './components/layouts/arch-dock/arch-dock.component';
import { ArchPanelComponent } from './components/layouts/arch-panel/arch-panel.component';
import { ArchDesktopComponent } from './components/layouts/arch-desktop/arch-desktop.component';
import { ArchWindowComponent } from './components/layouts/arch-window/arch-window.component';
import { ArchHeaderRightComponent } from './shared/arch-header/arch-header-right/arch-header-right.component';
import { ArchHeaderLeftComponent } from './shared/arch-header/arch-header-left/arch-header-left.component';
import { ArchHeaderCenterComponent } from './shared/arch-header/arch-header-center/arch-header-center.component';
import { ArchFooterComponent } from './shared/arch-footer/arch-footer.component';
import { ArchStatusComponent } from './shared/arch-status/arch-status.component';
import { ArchButtonBarComponent } from './components/actions/arch-button-bar/arch-button-bar.component';
import { mapNgArchUiComponents } from './models/ng-arch-ui-config';
import { NgArchUiComponentsToken } from './models/ng-arch-ui-options';
import { NgArchUiService } from './services/ng-arch-ui.service';

@NgModule({
  imports: [
    CommonModule,
    AngularDraggableModule
  ],
  declarations: [
    ArchActionComponent,
    NgArchUiComponent,
    ArchDockComponent,
    ArchDropdownComponent,
    ArchPanelComponent,
    ArchFooterComponent,
    ArchStatusComponent,
    ArchDesktopComponent,
    ArchWindowComponent,
    ArchHeaderRightComponent,
    ArchHeaderLeftComponent,
    ArchHeaderCenterComponent,
    ArchButtonBarComponent
  ],
  exports: [ NgArchUiComponent ],
  entryComponents: [
    ArchActionComponent,
    ArchDockComponent,
    ArchDropdownComponent,
    ArchPanelComponent,
    ArchFooterComponent,
    ArchStatusComponent,
    ArchDesktopComponent,
    ArchWindowComponent
  ],
   providers: [
     NgArchUiService,
    { provide: NgArchUiComponentsToken, useValue: mapNgArchUiComponents}
  ]
})
export class NgArchUiModule { }
