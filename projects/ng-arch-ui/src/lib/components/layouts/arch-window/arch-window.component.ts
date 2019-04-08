import { Component, OnInit, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

import { NgArchUiService } from './../../../services/ng-arch-ui.service';
import { ArchUiComponent } from '../../../models/ng-arch-ui-meta';
import { ArchUiAction } from '../../../models/ng-arch-ui-action';
import { ArchUiContainer } from '../../../models/ng-arch-ui-model';
import { NgArchUiElementOptions } from '../../../models/ng-arch-ui-options';

@Component({
  selector: 'arch-window',
  templateUrl: './arch-window.component.html',
  styleUrls: ['./arch-window.component.scss']
})
export class ArchWindowComponent implements OnInit, ArchUiComponent {
  archUiElement: ArchUiContainer;
  elementOptions: NgArchUiElementOptions;

  // @ViewChild('window', { read: ViewContainerRef }) windowRef: ViewContainerRef;
  @ViewChild('window_main', { read: ViewContainerRef }) windowMainRef: ViewContainerRef;
  @ViewChild('window_children', { read: ViewContainerRef }) windowChildrenRef: ViewContainerRef;
  @Output() resizing = new EventEmitter<any>();

  rightButtons: ArchUiAction[] = [];

  private isDragging = false;
  private isStoppingDrag = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngArchUiService: NgArchUiService
  ) { }

  get isMostTop() {
    return this.archUiElement && this.archUiElement.__isMostTop;
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

    if (this.elementOptions) {
      const options = this.elementOptions;
      const keys = ['top', 'left', 'width', 'height', 'right', 'bottom'];
      const querySelector = this.el.nativeElement.querySelector('div:first-child');

      keys.forEach(key => {
        if (options[key]) {
          this.renderer.setStyle(querySelector, key, options[key]);
        }
      });
    }
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
