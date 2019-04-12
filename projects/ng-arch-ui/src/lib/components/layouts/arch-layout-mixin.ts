import { ElementRef, Renderer2 } from '@angular/core';
import { merge } from 'lodash-es';

import { ArchPartTheme, ArchPartType, ThemeType, ArchUiCss, ArchUiType } from './../../models/ng-arch-ui-meta';
import { ArchUiElement, ArchUiContainer } from '../../models/ng-arch-ui-model';
import { NgArchUiElementOptions } from 'ng-arch-ui/public_api';
import { NgArchUiService } from '../../services/ng-arch-ui.service';


export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype)
      .forEach(name => {
        Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

export interface ArchGenericLayout {
  getDefaultTheme(): void;
  setHeaderStyle(): void;
  setViewStyle(): void;
  setViewPosition(selector?: string): void;
}

const cssKeys = ['top', 'left', 'width', 'height', 'right', 'bottom'];

export class ArchLayoutMixin implements ArchGenericLayout {
  uiType: ArchUiType;
  archUiElement: ArchUiElement | ArchUiContainer;
  elementOptions: NgArchUiElementOptions;
  partThemes: ArchPartTheme;
  defaultTheme: ArchPartTheme;

  private el: ElementRef;
  private renderer: Renderer2;
  private ngArchUiService: NgArchUiService;

  getDefaultTheme() {
    this.defaultTheme = this.ngArchUiService.getTheme(this.uiType);
  }

  setHeaderStyle(headerSelector = '.arch-header-bar') {
    const themes = merge({}, this.defaultTheme, this.partThemes);
    const element = this.el.nativeElement.querySelector(headerSelector);
    const partType = ArchPartType.Header;
    const renderer = this.renderer;

    this.archUiElement.getTopest().subscribe(topest => {
      const themeType = topest ? ThemeType.Focus : ThemeType.FocusOut;
      const styles: ArchUiCss = themes[partType][themeType];

      Object.keys(styles).forEach(key => {
        if (styles[key]) {
          const cssKey = key.replace('_', '-');
          renderer.setStyle(element, cssKey, styles[key]);
        }
      });
    });
  }

  setViewStyle() {
    const nativeElement = this.el.nativeElement;
    const uiElement = this.archUiElement;
    this.renderer.setStyle(nativeElement, 'z-index', uiElement.__zIndex);
  }

  setViewPosition(selector: string = 'div:first-child') {
    const options = this.elementOptions;

    if (options) {
      const element = this.el.nativeElement.querySelector(selector);

      cssKeys.forEach(key => {
        if (options[key]) {
          this.renderer.setStyle(element, key, options[key]);
        }
      });
    }
  }
}
