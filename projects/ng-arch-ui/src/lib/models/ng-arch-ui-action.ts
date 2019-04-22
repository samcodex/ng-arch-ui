import { ArchUiElement } from './ng-arch-ui-model';

export class ArchUiAction {
  id: string;
  name: string;
  label?: string;
  tip?: string;
  actions?: ArchUiAction[];
  that: any;
  handler?: any;
  icon?: string;

  type: ArchUiActionType;
  act: ArchUiActionAct;
  owner: ArchUiElement;

  constructor(name: string, type: ArchUiActionType) {
    this.name = name;
    this.type = type;
  }
}

export enum ArchUiActionType {
  IconButton = 'IconButton'
}

export enum ArchUiActionAct {
  Close = 'Close',
  Minimize = 'Minimize',
  Maximize = 'Maximize'
}

export namespace ArchUiAction {
  export function createCloseButton(owner: ArchUiElement) {
    const action = new ArchUiAction('Close', ArchUiActionType.IconButton);
    action.act = ArchUiActionAct.Close;
    owner.appendActions(action);

    return action;
  }

  export function createMinimizeButton(owner: ArchUiElement) {
    const action = new ArchUiAction('Minimize', ArchUiActionType.IconButton);
    action.act = ArchUiActionAct.Minimize;
    owner.appendActions(action);

    return action;
  }

  export function createMaximizeButton(owner: ArchUiElement) {
    const action = new ArchUiAction('Maximize', ArchUiActionType.IconButton);
    action.act = ArchUiActionAct.Maximize;
    owner.appendActions(action);

    return action;
  }
}
