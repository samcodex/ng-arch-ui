import { Component, OnInit, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

import { NgArchUiService } from './../../../services/ng-arch-ui.service';
import { ArchUiComponent, ArchUiType, ArchPartTheme } from '../../../models/ng-arch-ui-meta';
import { ArchUiAction } from '../../../models/ng-arch-ui-action';
import { ArchUiContainer } from '../../../models/ng-arch-ui-model';
import { NgArchUiElementOptions } from '../../../models/ng-arch-ui-options';
import { applyMixins, ArchGenericLayout, ArchLayoutMixin } from '../arch-layout-mixin';

@Component({
  selector: 'arch-window',
  templateUrl: './arch-window.component.html',
  styleUrls: ['./arch-window.component.scss']
})
export class ArchWindowComponent implements OnInit, ArchUiComponent, ArchGenericLayout {
  uiType = ArchUiType.Window;
  archUiElement: ArchUiContainer;
  elementOptions: NgArchUiElementOptions;
  partThemes: ArchPartTheme;
  defaultTheme: ArchPartTheme;

  // @ViewChild('window', { read: ViewContainerRef }) windowRef: ViewContainerRef;
  @ViewChild('window_main', { read: ViewContainerRef }) windowMainRef: ViewContainerRef;
  @ViewChild('window_children', { read: ViewContainerRef }) windowChildrenRef: ViewContainerRef;
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
    return this.windowMainRef;
  }

  getChildrenContainerRef(): ViewContainerRef {
    return this.windowChildrenRef;
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
    event.preventDefault();
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

applyMixins(ArchWindowComponent, [ ArchLayoutMixin ]);
