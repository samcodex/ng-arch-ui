import { UiLocation } from './ng-arch-ui-meta';
import { ArchUiElement } from './ng-arch-ui-model';

export class ArchUiDock {
  uiLocation: UiLocation = UiLocation.Bottom;
  dockItems: ArchUiDockItem[];

  constructor() {
    this.dockItems = [];
    this.dockToFlow();
  }

  dockToTop() {
    this.uiLocation = UiLocation.Top;
  }

  dockToBottom() {
    this.uiLocation = UiLocation.Bottom;
  }

  dockToFlow() {
    this.uiLocation = UiLocation.Flow;
  }

  createItem(title: string) {
    const lastOrder = this.dockItems.length === 0 ? -1 : this.dockItems[this.dockItems.length - 1].order;
    const item = new ArchUiDockItem(title, lastOrder + 1, this);

    this.dockItems.push(item);
  }

  appendUiElement(uiElement: ArchUiElement) {
    const title = uiElement.name;
    this.createItem(title);
  }
}

export class ArchUiDockItem {

  constructor(
    public title: string,
    public order: number,
    public dock: ArchUiDock
  ) {
    this.title = title;
  }


}
