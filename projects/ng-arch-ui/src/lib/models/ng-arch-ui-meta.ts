import { ViewContainerRef, EventEmitter } from '@angular/core';
import { ArchUiElement, ArchUiContainer } from './ng-arch-ui-model';
import { NgArchUiElementOptions } from './ng-arch-ui-options';

export interface ArchUiComponent {
  archUiElement: ArchUiElement | ArchUiContainer;
  elementOptions?: NgArchUiElementOptions;
  resizing?: EventEmitter<any>;
  getMainContainerRef(): ViewContainerRef;
  getChildrenContainerRef(): ViewContainerRef;
}
