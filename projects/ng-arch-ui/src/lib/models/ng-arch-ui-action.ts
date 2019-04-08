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

  constructor(name: string, type: ArchUiActionType) {
    this.name = name;
    this.type = type;
  }
}

export enum ArchUiActionType {
  IconButton = 'iconButton'
}

export enum ArchUiActionAct {
  Close = 'close',
  Minimize = 'minimize',
  Maximize = 'maximize'
}

export namespace ArchUiAction {
  export function createCloseButton() {
    const action = new ArchUiAction('Close', ArchUiActionType.IconButton);
    action.act = ArchUiActionAct.Close;

    return action;
  }

  export function createMinimizeButton() {
    const action = new ArchUiAction('Minimize', ArchUiActionType.IconButton);
    action.act = ArchUiActionAct.Minimize;

    return action;
  }

  export function createMaximizeButton() {
    const action = new ArchUiAction('Maximize', ArchUiActionType.IconButton);
    action.act = ArchUiActionAct.Maximize;

    return action;
  }
}
