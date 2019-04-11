import { ArchUiTheme, ThemeType, ArchUiType, ArchPartType } from './ng-arch-ui-meta';

export interface NgArchUiOptions {
  alwaysRefresh?: boolean;
}

export interface NgArchUiElementOptions {
  left?: string;
  top?: string;
  width?: string;
  height?: string;
  right?: string;
  bottom?: string;
}

export const archUiThemeConfig: ArchUiTheme = {
  [ ArchUiType.Window ]: {
    [ ArchPartType.Header ]: {
      [ ThemeType.FocusOut ]: {
        color: '#667990',
        background_color: '#b6cbf1'
      },
      [ ThemeType.Focus ]: {
        color: '#1e5799',
        background_color: '#739eea'
      }
    }
  },
  [ ArchUiType.Panel ]: {
    [ ArchPartType.Header ]: {
      [ ThemeType.FocusOut ]: {
        color: '#667990',
        background_color: '#dfead7'
      },
      [ ThemeType.Focus ]: {
        color: '#1e5799',
        background_color: '#efcb64'
      }
    }
  }
};
