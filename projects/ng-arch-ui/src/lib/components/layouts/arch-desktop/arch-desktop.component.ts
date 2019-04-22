import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { NgArchUiService } from './../../../services/ng-arch-ui.service';
import { ArchUiComponent, ArchPartTheme, ArchUiType } from '../../../models/ng-arch-ui-meta';
import { ArchUiElement, ArchUiContainer } from '../../../models/ng-arch-ui-model';
import { NgArchUiElementOptions } from '../../../models/ng-arch-ui-options';

@Component({
  templateUrl: './arch-desktop.component.html',
  styleUrls: ['./arch-desktop.component.scss']
})
export class ArchDesktopComponent implements OnInit, ArchUiComponent {
  uiType = ArchUiType.Desktop;
  archUiElement: ArchUiElement | ArchUiContainer;
  elementOptions: NgArchUiElementOptions;
  partThemes: ArchPartTheme;
  defaultTheme: ArchPartTheme;

  @ViewChild('desktop_main', { read: ViewContainerRef }) desktopMainRef: ViewContainerRef;
  @ViewChild('desktop_children', { read: ViewContainerRef }) desktopChildrenRef: ViewContainerRef;

  constructor(
    private ngArchUiService: NgArchUiService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  getMainContainerRef(): ViewContainerRef {
    return this.desktopMainRef;
  }

  getChildrenContainerRef(): ViewContainerRef {
    return this.desktopChildrenRef;
  }
}
