import { ViewContainerRef, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { ArchUiElement, ArchUiContainer } from './ng-arch-ui-model';
import { NgArchUiElementOptions } from './ng-arch-ui-options';

export interface ArchUiComponent {
  archUiElement: ArchUiElement | ArchUiContainer;
  elementOptions?: NgArchUiElementOptions;
  partThemes: ArchPartTheme;
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

export interface ArchStyler {
  setViewPosition: (selector: string, options: NgArchUiElementOptions) => void;
  setElementStyle: (selector: string, theme: ArchPartTheme, partType: ArchPartType, themeType: ThemeType) => void;
}

const cssKeys = ['top', 'left', 'width', 'height', 'right', 'bottom'];

export function getUiElementStyler(el: ElementRef, renderer: Renderer2): ArchStyler {
  return {
    setViewPosition: function(selector: string, options: NgArchUiElementOptions) {
      if (options) {
        const element = el.nativeElement.querySelector(selector);

        cssKeys.forEach(key => {
          if (options[key]) {
            renderer.setStyle(element, key, options[key]);
          }
        });
      }
    },
    setElementStyle: function(selector: string, theme: ArchPartTheme,
        partType: ArchPartType, themeType: ThemeType) {
      const styles: ArchUiCss = theme[partType][themeType];
      const element = el.nativeElement.querySelector(selector);

      Object.keys(styles).forEach(key => {
        if (styles[key]) {
          const cssKey = key.replace('_', '-');
          renderer.setStyle(element, cssKey, styles[key]);
        }
      });
    }
  };
}
