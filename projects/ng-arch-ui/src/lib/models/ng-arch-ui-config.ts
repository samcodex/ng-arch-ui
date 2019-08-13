import { Type } from '@angular/core';

import { ArchUiType } from './ng-arch-ui-meta';
import { NgArchUiComponent } from '../components/ng-arch-ui/ng-arch-ui.component';
import { ArchDesktopComponent } from '../components/layouts/arch-desktop/arch-desktop.component';
import { ArchWindowComponent } from '../components/layouts/arch-window/arch-window.component';
import { ArchPanelComponent } from '../components/layouts/arch-panel/arch-panel.component';

export const mapNgArchUiComponents: { [key in ArchUiType]?: Type<any> } = {
  [ ArchUiType.UiRoot ]: NgArchUiComponent,
  [ ArchUiType.Desktop ]: ArchDesktopComponent,
  [ ArchUiType.Window ]: ArchWindowComponent,
  [ ArchUiType.Panel ]: ArchPanelComponent,
};
