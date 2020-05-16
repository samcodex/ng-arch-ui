import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnDestroy, Renderer2, Input } from '@angular/core';
import { cloneDeep } from 'lodash-es';

import { NgArchUiService } from './../../services/ng-arch-ui.service';
import { ArchUiComponent, ArchPartTheme, ArchUiType } from '../../models/ng-arch-ui-meta';
import { ArchUiElement } from '../../models/ng-arch-ui-model';
import { NgArchUiElementOptions } from '../../models/ng-arch-ui-options';
import { ArchUiDock } from './../../models/ng-arch-ui-dock';
import { UiLocation } from './../../models/ng-arch-ui-meta';

const dockHeight = '34px';
const mainHeight = `calc(100% - ${dockHeight})`;
const styles = { top: null, left: null, bottom: null, width: null, height: null };

@Component({
  selector: 'ng-arch-ui',
  templateUrl: './ng-arch-ui.component.html',
  styleUrls: ['./ng-arch-ui.component.scss']
})
export class NgArchUiComponent implements OnInit, OnDestroy, ArchUiComponent {
  @Input()desktopData: any;

  uiType = ArchUiType.UiRoot;
  archUiElement: ArchUiElement;
  elementOptions: NgArchUiElementOptions;
  partThemes: ArchPartTheme;
  defaultTheme: ArchPartTheme;
  archUiDock: ArchUiDock;

  @ViewChild('ng_arch_ui_children', { read: ViewContainerRef, static: true }) uiChildrenRef: ViewContainerRef;
  @ViewChild('ng_arch_ui_main', { read: ViewContainerRef, static: true }) uiMainRef: ViewContainerRef;
  @ViewChild('ng_arch_ui_dock', { read: ViewContainerRef, static: true }) uiDockRef: ViewContainerRef;

  constructor(
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private ngArchUiService: NgArchUiService
  ) { }

  get hasFixDock(): boolean {
    const location = this.archUiDock.uiLocation;
    return location === UiLocation.Top || location === UiLocation.Bottom;
  }

  ngOnInit() {
    this.ngArchUiService.__init(this.resolver, this.uiChildrenRef);
    this.ngArchUiService.__render(this.desktopData);
    this.archUiElement = this.ngArchUiService.archDesktop;
    this.archUiDock = this.ngArchUiService.archUiDock;

    this.locateUiDesktopAndDock();
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

  private locateUiDesktopAndDock() {
    const styleKeys = Object.keys(styles);
    const dockStyles = cloneDeep(styles);
    const mainStyles = cloneDeep(styles);
    const dockLocation = this.archUiDock.uiLocation;

    const dockElement = dockLocation === UiLocation.Flow ? null : this.uiDockRef.element.nativeElement;
    const mainElement = this.uiMainRef.element.nativeElement;

    if (dockLocation === UiLocation.Flow) {
      mainStyles.height = '100%';
      mainStyles.top = 0;
    } else {
      mainStyles.height = mainHeight;
      dockStyles.height = dockHeight;

      if (dockLocation === UiLocation.Top) {
        dockStyles.top = 0;
        mainStyles.bottom = 0;
      } else if (dockLocation === UiLocation.Bottom) {
        mainStyles.top = 0;
        dockStyles.bottom = 0;
      }
    }

    styleKeys.forEach(key => {
      if (!dockElement && dockStyles[key] !== null) {
        this.renderer.setStyle(dockElement, key, dockStyles[key]);
      }

      if (mainStyles[key] !== null) {
        this.renderer.setStyle(mainElement, key, mainStyles[key]);
      }
    });

  }
}
