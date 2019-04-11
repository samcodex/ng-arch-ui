import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { merge } from 'lodash-es';

import { ArchUiComponent, ArchStyler, getUiElementStyler, ArchPartTheme, ArchUiType,
  ThemeType, ArchPartType } from '../../../models/ng-arch-ui-meta';
import { ArchUiElement, ArchUiContainer } from '../../../models/ng-arch-ui-model';
import { ArchUiAction } from '../../../models/ng-arch-ui-action';
import { NgArchUiService } from './../../../services/ng-arch-ui.service';
import { NgArchUiElementOptions } from '../../../models/ng-arch-ui-options';

@Component({
  selector: 'arch-panel',
  templateUrl: './arch-panel.component.html',
  styleUrls: ['./arch-panel.component.scss']
})
export class ArchPanelComponent implements OnInit, ArchUiComponent {
  archUiElement: ArchUiElement | ArchUiContainer;
  elementOptions: NgArchUiElementOptions;
  partThemes: ArchPartTheme;

  @ViewChild('panel_main', { read: ViewContainerRef }) panelMainRef: ViewContainerRef;

  @Output() resizing = new EventEmitter<any>();

  rightButtons: ArchUiAction[] = [];

  private isDragging = false;
  private isStoppingDrag = false;
  private styler: ArchStyler;
  private defaultTheme: ArchPartTheme;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngArchUiService: NgArchUiService
  ) {
    this.styler = getUiElementStyler(this.el, this.renderer);
    this.defaultTheme = this.ngArchUiService.getTheme(ArchUiType.Panel);
  }

  ngOnInit() {
    // const minimizeButton = ArchUiAction.createMinimizeButton();
    // minimizeButton.that = this;
    // minimizeButton.handler = this.close;
    // this.rightButtons.push(minimizeButton);

    // const maximizeButton = ArchUiAction.createMaximizeButton();
    // maximizeButton.that = this;
    // maximizeButton.handler = this.close;
    // this.rightButtons.push(maximizeButton);

    const closeButton = ArchUiAction.createCloseButton();
    closeButton.that = this;
    closeButton.handler = this.close;
    this.rightButtons.push(closeButton);

    this.styler.setViewPosition('div:first-child', this.elementOptions);
    this.setHeaderStyle();
  }

  getMainContainerRef(): ViewContainerRef {
    return this.panelMainRef;
  }

  getChildrenContainerRef(): ViewContainerRef {
    return null;
  }

  close() {
    this.ngArchUiService.__closeWindow(this.archUiElement);
  }

  minimize() {

  }

  maximize() {

  }

  onClick(event: Event) {
    event.stopPropagation();
    if (!this.isDragging) {
      if (this.isStoppingDrag) {
        this.isStoppingDrag = false;
      } else {
        this.select();
      }
    }
  }

  onDrag(element: any) {
    this.isDragging = true;
    this.select();
  }

  onStopDrag(element: any) {
    this.isDragging = false;
    // this.isStoppingDrag = true;
  }

  onResize(element: any) {
    this.select();
  }

  onResizing(element: any) {
    this.resizing.emit(element);
  }

  private select() {
    this.ngArchUiService.__moveUiElementOnTop(this.archUiElement);
  }

  setHeaderStyle() {
    const style = merge({}, this.defaultTheme, this.partThemes);
    this.archUiElement.getTopest().subscribe(topest => {
      const themeType = topest ? ThemeType.Focus : ThemeType.FocusOut;
      this.styler.setElementStyle('.arch-header-bar', style, ArchPartType.Header, themeType);
    });
  }
}

