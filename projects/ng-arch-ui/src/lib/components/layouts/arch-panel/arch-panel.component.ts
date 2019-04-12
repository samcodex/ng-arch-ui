import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

import { ArchUiComponent, ArchPartTheme, ArchUiType } from '../../../models/ng-arch-ui-meta';
import { ArchUiElement, ArchUiContainer } from '../../../models/ng-arch-ui-model';
import { ArchUiAction } from '../../../models/ng-arch-ui-action';
import { NgArchUiService } from './../../../services/ng-arch-ui.service';
import { NgArchUiElementOptions } from '../../../models/ng-arch-ui-options';
import { ArchGenericLayout, applyMixins, ArchLayoutMixin } from '../arch-layout-mixin';

@Component({
  selector: 'arch-panel',
  templateUrl: './arch-panel.component.html',
  styleUrls: ['./arch-panel.component.scss']
})
export class ArchPanelComponent implements OnInit, ArchUiComponent, ArchGenericLayout {
  uiType = ArchUiType.Panel;
  archUiElement: ArchUiElement | ArchUiContainer;
  elementOptions: NgArchUiElementOptions;
  partThemes: ArchPartTheme;
  defaultTheme: ArchPartTheme;

  @ViewChild('panel_main', { read: ViewContainerRef }) panelMainRef: ViewContainerRef;

  @Output() resizing = new EventEmitter<any>();

  rightButtons: ArchUiAction[] = [];

  private isDragging = false;
  private isStoppingDrag = false;

  getDefaultTheme: () => void;
  setHeaderStyle: () => void;
  setViewStyle: () => void;
  setViewPosition: (selector?: string) => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngArchUiService: NgArchUiService
  ) {
    this.getDefaultTheme();
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

    this.setViewPosition();
    this.setViewStyle();
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
}

applyMixins(ArchPanelComponent, [ ArchLayoutMixin ]);
