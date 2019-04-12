import { ViewContainerRef, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { ArchUiElement, ArchUiContainer } from './ng-arch-ui-model';
import { NgArchUiElementOptions } from './ng-arch-ui-options';

export interface ArchUiComponent {
  uiType: ArchUiType;
  archUiElement: ArchUiElement | ArchUiContainer;
  elementOptions?: NgArchUiElementOptions;
  partThemes: ArchPartTheme;
  defaultTheme: ArchPartTheme;

  resizing?: EventEmitter<any>;
  getMainContainerRef(): ViewContainerRef;
  getChildrenContainerRef(): ViewContainerRef;
}

export enum ArchUiType {
  UiRoot = 'UiRoot',
  Desktop = 'Desktop',
  Window = 'Window',
  Panel = 'Panel',
}

export enum ArchPartType {
  Header = 'Header',
  // Footer = 'Footer',
  // Action = 'Action',
  // Status = 'Status'
}

export enum ThemeType {
  FocusOut = 'FocusOut',
  Focus = 'Focus'
}

export interface ArchUiCss {
  color?: string;
  background_color?: string;
  border?: string;
}

export type ArchThemeStyle = { [key in ThemeType]?: ArchUiCss };

export type ArchPartTheme = { [key in ArchPartType]?: ArchThemeStyle };

export type ArchUiTheme = { [key in ArchUiType]?: ArchPartTheme } ;
