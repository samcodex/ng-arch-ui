import { Component, OnInit, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

import { NgArchUiService } from './../../../services/ng-arch-ui.service';
import { ArchUiType } from '../../../models/ng-arch-ui-meta';
import { ArchUiAction } from '../../../models/ng-arch-ui-action';
import { ArchUiContainer } from '../../../models/ng-arch-ui-model';
import { ArchGenericLayout } from '../arch-generic-layout';

@Component({
  templateUrl: './arch-window.component.html',
  styleUrls: ['./arch-window.component.scss']
})
export class ArchWindowComponent extends ArchGenericLayout implements OnInit {
  uiType = ArchUiType.Window;
  archUiElement: ArchUiContainer;

  // @ViewChild('window', { read: ViewContainerRef }) windowRef: ViewContainerRef;
  @ViewChild('window_main', { read: ViewContainerRef }) windowMainRef: ViewContainerRef;
  @ViewChild('window_children', { read: ViewContainerRef }) windowChildrenRef: ViewContainerRef;
  @Output() resizing = new EventEmitter<any>();

  rightButtons: ArchUiAction[] = [];

  private isDragging = false;
  private isStoppingDrag = false;

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    ngArchUiService: NgArchUiService
  ) {
    super(el, renderer, ngArchUiService);
    this.getDefaultTheme();
  }

  ngOnInit() {
    // const minimizeButton = ArchUiAction.createMinimizeButton(this.archUiElement);
    // minimizeButton.that = this;
    // minimizeButton.handler = this.close;
    // this.rightButtons.push(minimizeButton);

    // const maximizeButton = ArchUiAction.createMaximizeButton(this.archUiElement);
    // maximizeButton.that = this;
    // maximizeButton.handler = this.close;
    // this.rightButtons.push(maximizeButton);

    const closeButton = ArchUiAction.createCloseButton(this.archUiElement);
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
