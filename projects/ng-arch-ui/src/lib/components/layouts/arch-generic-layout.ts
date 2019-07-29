import { ElementRef, Renderer2, EventEmitter, ViewContainerRef } from '@angular/core';
import { merge } from 'lodash-es';

import { ArchPartTheme, ArchPartType, ThemeType, ArchUiCss, ArchUiType, ArchUiComponent } from './../../models/ng-arch-ui-meta';
import { ArchUiElement, ArchUiContainer } from '../../models/ng-arch-ui-model';
import { NgArchUiElementOptions } from '../../models/ng-arch-ui-options';
import { NgArchUiService } from '../../services/ng-arch-ui.service';

const cssKeys = ['top', 'left', 'width', 'height', 'right', 'bottom'];

export abstract class ArchGenericLayout implements ArchUiComponent {
  uiType: ArchUiType;
  archUiElement: ArchUiElement | ArchUiContainer;
  elementOptions: NgArchUiElementOptions;
  partThemes: ArchPartTheme;
  defaultTheme: ArchPartTheme;

  constructor(
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected ngArchUiService: NgArchUiService
  ) { }

  abstract resizing?: EventEmitter<any>;
  abstract getMainContainerRef(): ViewContainerRef;
  abstract getChildrenContainerRef(): ViewContainerRef;

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
