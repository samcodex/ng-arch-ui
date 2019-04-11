import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { NgArchUiService } from './../../services/ng-arch-ui.service';
import { ArchUiComponent, ArchPartTheme } from '../../models/ng-arch-ui-meta';
import { ArchUiElement } from '../../models/ng-arch-ui-model';
import { NgArchUiElementOptions } from '../../models/ng-arch-ui-options';

@Component({
  selector: 'ng-arch-ui',
  templateUrl: './ng-arch-ui.component.html',
  styleUrls: ['./ng-arch-ui.component.scss']
})
export class NgArchUiComponent implements OnInit, OnDestroy, ArchUiComponent {
  archUiElement: ArchUiElement;
  elementOptions: NgArchUiElementOptions;
  partThemes: ArchPartTheme;

  @ViewChild('ng_arch_ui_children', { read: ViewContainerRef }) uiChildrenRef: ViewContainerRef;

  constructor(
    private ngArchUiService: NgArchUiService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.ngArchUiService.__init(this.resolver, this.uiChildrenRef);
    this.ngArchUiService.__render();
    this.archUiElement = this.ngArchUiService.archDesktop;
  }

  ngOnDestroy() {
    this.ngArchUiService.__destroy();
  }

  getMainContainerRef() {
    return null;
  }

  getChildrenContainerRef() {
    return this.uiChildrenRef;
  }

  onClick(event: Event) {
    event.stopPropagation();
    this.select();
  }

  private select() {
    this.ngArchUiService.__moveUiElementOnTop(this.archUiElement);
  }
}
